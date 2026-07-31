#include <iostream>
namespace GoldRush {
float GetFriction(float weight, float contactArea, float mudDepth, float moisture, float slope) {
    float groundPressure = weight / contactArea; // kPa
    float baseFriction = 0.9f; // gravier route
    if(mudDepth>0.5f) baseFriction=0.3f; // boue profonde SnowRunner
    float friction = baseFriction - mudDepth*0.4f - moisture*0.25f - (slope/90.0f)*0.2f + (groundPressure<30 ? 0.15f : -0.1f);
    if(friction<0.1f) friction=0.1f;
    if(friction>1.0f) friction=1.0f;
    return friction;
}
}
