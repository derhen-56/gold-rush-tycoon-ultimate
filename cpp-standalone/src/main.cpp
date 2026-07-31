#include "core/Game.h"
#include <iostream>

// V5 REAL C++ GAME - Entry point
// This .exe will be built via GitHub Actions Windows runner and via local VS2022
// Realistic terrain via RealTerrain (SRTM), real equipment CAT320/D6/Sluicifer faithful

int main() {
    std::cout << "============================================\n";
    std::cout << "GOLD RUSH TYCOON ULTIMATE V5 - C++ STUDIO\n";
    std::cout << "Engine: Unreal 5.7 / Godot 4.3 + C++ Core\n";
    std::cout << "Terrain: Real DEM SRTM + Sentinel-2 Satellite\n";
    std::cout << "Equipment: 100 real machines, no AI slop\n";
    std::cout << "============================================\n";

    GoldRush::Game game;
    if (!game.Initialize()) {
        std::cerr << "Failed to initialize game!" << std::endl;
        return 1;
    }

    // Account system - simplified (no email SMTP, as per user feedback)
    std::string email, password, username;
    std::cout << "Email: "; std::cin >> email;
    std::cout << "Password: "; std::cin >> password;
    std::cout << "Username: "; std::cin >> username;

    if (!game.CreateOrLogin(email, password, username)) {
        std::cerr << "Login failed!" << std::endl;
        return 1;
    }

    std::cout << "Bienvenue " << username << " - Mode Carrière Solo\n";
    std::cout << "Admin Code perso: " << game.GetAdminCode() << " (24 chars sécurisé)\n";

    game.Run();

    return 0;
}
