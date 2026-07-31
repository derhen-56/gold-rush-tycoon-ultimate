#include "CAT320.h"
#include <iostream>
namespace GoldRush {
void CAT320::Spawn() {
    std::cout << "[EQUIP] Spawn CAT 320F L fidèle: track 48 patins, sprocket, idler, 7 galets, tourelle, cabine ROPS vitrée, bras boom 5.6m + stick 2.9m, 3 vérins hydrauliques Ø140mm visibles, godet 1.19m³ 5 dents" << std::endl;
}
void CAT320::UpdateArm(float mx, float my) {
    // IK inverse kinematics pour bras
}
void CAT320::Dig(float& pay, float& gold) {
    pay = 16.0f; // prod yd³/h
}
}
