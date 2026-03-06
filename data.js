// Disaster Data Configuration
const disasterData = {
    EARTHQUAKE: {
        title: "🌍 Earthquake Response",
        safetyActions: [
            "DROP immediately to the ground",
            "COVER your head and neck with your arms",
            "HOLD under a sturdy desk or table if available",
            "Stay away from windows and mirrors",
            "Remain in place until shaking stops (usually 60 seconds)",
            "Check yourself and others for injuries",
            "Exit the building carefully if damage is visible",
            "Move to an open area away from structures",
            "Do NOT use elevators"
        ],
        checklist: [
            "Know safe spots under sturdy furniture",
            "Practice drop, cover, and hold on drills",
            "Secure heavy objects and furniture",
            "Store emergency supplies in accessible location",
            "Know at least two exits from your building",
            "Keep a flashlight and first aid kit ready",
            "Know how to turn off gas and water",
            "Have a family communication plan"
        ],
        emergencyContacts: [
            { name: "Police (Emergency)", phone: "100" },
            { name: "Fire Department", phone: "101" },
            { name: "Ambulance", phone: "102" },
            { name: "Disaster Management (NDMA)", phone: "1078" }
        ]
    },

    FIRE: {
        title: "🔥 Fire Response",
        safetyActions: [
            "Activate the fire alarm immediately",
            "Alert everyone nearby - shout 'FIRE'",
            "Evacuate the building immediately",
            "Use stairs NEVER use elevators",
            "Stay low to avoid smoke and heat",
            "Feel doors for heat before opening",
            "If trapped, go to a window and signal for help",
            "Close doors behind you to slow fire spread",
            "Meet at the designated assembly point"
        ],
        checklist: [
            "Know all emergency exits in your building",
            "Participate in fire safety drills",
            "Never block emergency exits",
            "Know how to operate fire extinguishers (PASS method)",
            "Keep corridors and stairwells clear",
            "Know the designated assembly area",
            "Have an evacuation buddy",
            "Check smoke detectors are functional"
        ],
        emergencyContacts: [
            { name: "Fire Department (Emergency)", phone: "101" },
            { name: "Police", phone: "100" },
            { name: "Ambulance", phone: "102" },
            { name: "Local Fire Station", phone: "1077" }
        ]
    },

    FLOOD: {
        title: "💧 Flood Response",
        safetyActions: [
            "Move to higher ground immediately",
            "Do NOT attempt to cross flooded areas",
            "Avoid driving through flooded roads (vehicles can be swept away)",
            "Turn off electrical circuits in flooded areas",
            "Do NOT touch electrical equipment if wet",
            "Gather important documents and valuables",
            "Stay away from power lines and fallen wires",
            "Follow official evacuation orders",
            "Listen to emergency broadcasts for updates"
        ],
        checklist: [
            "Know the high ground areas in your locality",
            "Have an emergency evacuation bag packed",
            "Keep important documents in waterproof container",
            "Know your area's flood risk level",
            "Have contact numbers of family members",
            "Know locations of emergency shelters",
            "Store clean water and non-perishable food",
            "Keep battery-powered radio and flashlights"
        ],
        emergencyContacts: [
            { name: "Flood Relief (State Disaster Management)", phone: "1077" },
            { name: "Police", phone: "100" },
            { name: "Ambulance", phone: "102" },
            { name: "Local Municipal Office", phone: "105" }
        ]
    },

    CYCLONE: {
        title: "🌪️ Cyclone Response",
        safetyActions: [
            "Monitor weather alerts and warnings",
            "Stay indoors in a reinforced room",
            "Close all doors and windows securely",
            "Draw curtains and blinds to prevent glass injuries",
            "Move away from windows to an interior room",
            "Stay on lowest floors (avoid upper levels)",
            "Take shelter in a bathtub or under mattress if needed",
            "Do NOT go outdoors during the cyclone",
            "Wait for official all-clear before leaving shelter"
        ],
        checklist: [
            "Stock food and water for at least 3 days",
            "Keep first aid kit well-stocked",
            "Secure outdoor items that can become projectiles",
            "Know the location of nearest cyclone shelter",
            "Have battery-powered radio for weather updates",
            "Keep charged phone and power banks",
            "Have list of emergency contacts",
            "Practice cyclone drill annually"
        ],
        emergencyContacts: [
            { name: "Cyclone Alert Center", phone: "1099" },
            { name: "Police", phone: "100" },
            { name: "Rescue and Relief", phone: "102" },
            { name: "Meteorological Department", phone: "1095" }
        ]
    }
};

// Preparedness Status Logic
function getPreparednessStatus(score) {
    if (score >= 75) {
        return { status: "Prepared", badgeClass: "prepared" };
    } else if (score >= 50) {
        return { status: "Moderately Prepared", badgeClass: "prepared" };
    } else {
        return { status: "Needs Improvement", badgeClass: "needs-improvement" };
    }
}

// JSON Schema Generator
function generateJSONSchema(disasterType, preparednessScore, checkedItems) {
    const disaster = disasterData[disasterType];
    const statusInfo = getPreparednessStatus(preparednessScore);
    
    return {
        disaster_type: disasterType,
        preparedness_score: preparednessScore,
        safety_actions: disaster.safetyActions,
        emergency_contacts: disaster.emergencyContacts.map(c => c.name),
        status: statusInfo.status,
        checked_items: checkedItems,
        timestamp: new Date().toISOString()
    };
}
