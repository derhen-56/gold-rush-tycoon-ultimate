#pragma once
#include <string>
#include <vector>
#include <memory>

namespace GoldRush {

struct Claim {
    std::string id;
    double lat, lng;
    std::string name_fr, name_en;
    std::string region, country;
    int price, rent;
    int goldMin, goldMax;
    float richness, overburden;
    int size, diff;
    bool water;
    std::string type, color;
};

struct EquipmentDef {
    std::string id;
    std::string name_fr, name_en;
    std::string cat, role;
    int buy, rent;
    float prod, fuel, power;
    std::vector<std::string> need; // dependencies
};

class Game {
public:
    Game();
    bool Initialize();
    bool CreateOrLogin(const std::string& email, const std::string& pass, const std::string& username);
    void Run();
    std::string GetAdminCode() const { return admin_code; }

private:
    std::vector<Claim> claims;
    std::vector<EquipmentDef> equipments;
    std::string admin_code;
    std::string current_user;
    
    void LoadRealClaims(); // 500 claims USGS
    void GenerateSecureAdminCode(); // 24 chars mixed upper/lower/digit/special
    void InitClaims();
    void InitEquipments(); // 100 machines faithful

    // Core loop
    void GameLoop();
    void Render();
    void UpdatePhysics(float dt);
};

}
