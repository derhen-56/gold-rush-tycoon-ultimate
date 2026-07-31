#include "Sluicifer.h"
#include <iostream>
namespace GoldRush {
void Sluicifer::Spawn() {
    std::cout << "[EQUIP] Spawn Sluicifer fidèle Macon SD-600m: noir mat RAL9005 châssis, orange RAL2005 panneaux, deck 6x20ft tôle perforée 20mm, spray bars, 3 sluice runs 1.2m larges riffles profilés, hopper entrée, conveyor sortie" << std::endl;
}
float Sluicifer::Wash(float payIn, float water, float power) {
    if(water<1000 || power<100) return 0; // besoin 3000GPM + 110kW
    return payIn * 0.012f; // 1.2% recovery
}
}
