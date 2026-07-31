cmake_minimum_required(VERSION 3.16)
project(GoldRushTycoonV5 CXX)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Raylib fallback if available, else headless logic only
# For Windows build, user needs to install raylib: vcpkg install raylib

add_executable(GoldRushTycoon
    src/main.cpp
    src/core/Game.cpp
    src/core/ClaimSystem.cpp
    src/core/Economy.cpp
    src/terrain/RealTerrain.cpp
    src/equipment/CAT320.cpp
    src/equipment/D6_LGP.cpp
    src/equipment/Sluicifer.cpp
    src/equipment/Conveyor.cpp
    src/physics/MudPhysics.cpp
)

target_include_directories(GoldRushTycoon PRIVATE src)

# If raylib found, link
find_package(raylib QUIET)
if(raylib_FOUND)
    target_link_libraries(GoldRushTycoon PRIVATE raylib)
    target_compile_definitions(GoldRushTycoon PRIVATE HAS_RAYLIB)
    message(STATUS "Raylib found - building with 3D rendering")
else()
    message(STATUS "Raylib not found - building headless logic only (still playable via Godot)")
endif()

# For web export, use Emscripten
# emcmake cmake -B build-web && cmake --build build-web
