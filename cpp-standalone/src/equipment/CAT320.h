#pragma once
// CAT 320F L Excavator - Fidèle blueprint réel, pas cube
// Specs: 22.7T, C7.1 164hp, godet 1.19m³, portée 9.1m, chenilles 600mm, vérins Ø140mm
namespace GoldRush {
class CAT320 {
public:
    void Spawn(); // crée mesh détaillé : track 48 shoes + sprocket + idler + rollers + base + tourelle + cab ROPS + bras 2 segments + 3 vérins + godet 5 dents
    void UpdateArm(float mouseX, float mouseY); // IK
    void Dig(float& payMined, float& goldMined);
};
}
