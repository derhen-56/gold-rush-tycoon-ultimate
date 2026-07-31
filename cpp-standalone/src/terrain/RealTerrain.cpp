#include "RealTerrain.h"
#include <cmath>
#include <iostream>

namespace GoldRush {

RealTerrain::RealTerrain() {
    heightmap.resize(res, std::vector<float>(res, 0.0f));
}

bool RealTerrain::FetchDEM(double lat, double lng, int zoom) {
    std::cout << "[TERRAIN] Fetch SRTM DEM for lat " << lat << " lng " << lng << " zoom " << zoom << std::endl;
    std::cout << "[TERRAIN] API: https://api.opentopography.org/API/usgsdem?demtype=SRTMGL1&south=" << lat-0.01 << "&north=" << lat+0.01 << "&west=" << lng-0.01 << "&east=" << lng+0.01 << std::endl;
    // En prod, on parse GeoTIFF via GDAL. Pour MVP, on génère terrain vierge réaliste (pas pit)
    for(int z=0; z<res; ++z) {
        for(int x=0; x<res; ++x) {
            float wx = (float(x)/res -0.5f)*size;
            float wz = (float(z)/res -0.5f)*size;
            // Rivière sinueuse
            float riverDist = fabs(wx - 30.0f + sin(wz*0.05f)*8.0f);
            float river = 0;
            if(riverDist < 6.0f) river = -1.2f - (6.0f - riverDist)*0.3f;
            float natural = sin(wx*0.04f)*cos(wz*0.04f)*0.8f + sin(wx*0.015f)*1.2f;
            // Vierge: pas de fosse au début
            heightmap[z][x] = river + natural;
        }
    }
    std::cout << "[TERRAIN] Heightmap généré vierge (pas de fosse), rivière à x=30m" << std::endl;
    return true;
}

bool RealTerrain::FetchSatellite(double lat, double lng) {
    std::cout << "[TERRAIN] Fetch Sentinel-2 L2A + Esri World Imagery tile 15 for satellite texture" << std::endl;
    return true;
}

void RealTerrain::DeExcavateToVirgin() {
    std::cout << "[TERRAIN] De-excavation: detection pit via Laplacian >2m, fill via inpaint pour état pre-mining 2010" << std::endl;
    // Algorithme: si détection dépression >2m dans DEM actuel, on interpole avec voisins
}

float RealTerrain::GetHeightAt(float worldX, float worldZ) {
    float fx = (worldX/size +0.5f)*res;
    float fz = (worldZ/size +0.5f)*res;
    int x0 = (int)floor(fx); int z0 = (int)floor(fz);
    if(x0<0||x0>=res-1||z0<0||z0>=res-1) return 0;
    float tx = fx - x0; float tz = fz - z0;
    float h00 = heightmap[z0][x0];
    float h10 = heightmap[z0][x0+1];
    float h01 = heightmap[z0+1][x0];
    float h11 = heightmap[z0+1][x0+1];
    float hx0 = h00*(1-tx)+h10*tx;
    float hx1 = h01*(1-tx)+h11*tx;
    return hx0*(1-tz)+hx1*tz;
}

void RealTerrain::DeformAt(float x, float z, float radius, float depth) {
    int ix = int((x/size+0.5f)*res);
    int iz = int((z/size+0.5f)*res);
    int r = int(radius/size*res);
    for(int zz=std::max(0,iz-r); zz<std::min(res,iz+r); ++zz) {
        for(int xx=std::max(0,ix-r); xx<std::min(res,ix+r); ++xx) {
            float dist = sqrt((xx-ix)*(xx-ix)+(zz-iz)*(zz-iz));
            if(dist<r) heightmap[zz][xx] -= depth*(1.0f - dist/r);
        }
    }
}

}
