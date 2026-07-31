#pragma once
#include <vector>
#include <string>

namespace GoldRush {

class RealTerrain {
public:
    RealTerrain();
    // Fetch real DEM from OpenTopography SRTM 30m for lat/lng
    bool FetchDEM(double lat, double lng, int zoom=14);
    // Fetch satellite Sentinel-2
    bool FetchSatellite(double lat, double lng);
    // Dé-excavation: si DEM montre fosse déjà exploitée, on comble pour état vierge 2010
    void DeExcavateToVirgin();
    float GetHeightAt(float worldX, float worldZ); // bilinear for collision FPS
    void DeformAt(float x, float z, float radius, float depth); // dozer/excav

private:
    std::vector<std::vector<float>> heightmap;
    int res = 512;
    float size = 500.0f; // meters
    std::string claimId;
};

}
