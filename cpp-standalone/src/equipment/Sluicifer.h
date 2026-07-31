#pragma once
// Sluicifer - VRAIE laverie Parker, pas Big Red trommel
// Macon Industries SD-600m, noir mat RAL9005 + orange RAL2005, deck 6x20ft, 3 sluices 1.2m, 200yd³/h, prix réel $985k
namespace GoldRush {
class Sluicifer {
public:
    void Spawn(); // châssis noir, panneaux orange, deck perforé 20mm, spray bars, 3 sluices larges avec riffles profilés, grizzly haut
    float Wash(float paydirtIn, float waterFlow, float power); // return gold oz
};
}
