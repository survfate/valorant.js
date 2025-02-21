export class ItemParser {
    data: any

    /**
     * Parses the valorant storefront item's
     * @param data {object} Data to parse
     * @returns {object} parsed data
     */
    constructor(data) {
        this.data = data;
    };

    parse() {
        if(JSON.stringify(this.data).includes("characters")){
            const characters = this.data.characters;
            const maps = this.data.maps;
            const chromas = this.data.chromas;
            const skins = this.data.skins;
            const skinLevels = this.data.skinLevels;
            const equips = this.data.equips;
            const gameModes = this.data.gameModes;
            const sprays = this.data.sprays;
            const sprayLevels = this.data.sprayLevels;
            const charms = this.data.charms;
            const charmLevels = this.data.charmLevels;
            const playerCards = this.data.playerCards;
            const playerTitles = this.data.playerTitles;

            const Characters = [];
            const Maps = [];
            const Chromas = [];
            const Skins = [];
            const SkinLevels = [];
            const Equips = [];
            const GameModes = [];
            const Sprays = [];
            const SprayLevels = [];
            const Charms = [];
            const CharmLevels = [];
            const PlayerCards = [];
            const PlayerTitles = [];

            characters.forEach(element => {
                if(element)
                    Characters.push({ name: element.name, id: element.id.toLowerCase() });
            });
            maps.forEach(element => {
                if(element)
                    Maps.push({ name: element.name, id: element.id.toLowerCase() });
            });
            chromas.forEach(element => {
                if(element)
                    Chromas.push({ name: element.name, id: element.id.toLowerCase() });
            });
            skins.forEach(element => {
                if(element)
                    Skins.push({ name: element.name, id: element.id.toLowerCase() });
            });
            skinLevels.forEach(element => {
                if(element)
                    SkinLevels.push({ name: element.name, id: element.id.toLowerCase() });
            });
            equips.forEach(element => {
                if(element)
                    Equips.push({ name: element.name, id: element.id.toLowerCase() });
            });
            gameModes.forEach(element => {
                if(element)
                    GameModes.push({ name: element.name, id: element.id.toLowerCase() });
            });
            sprays.forEach(element => {
                if(element)
                    Sprays.push({ name: element.name, id: element.id.toLowerCase() });
            });
            sprayLevels.forEach(element => {
                if(element)
                    SprayLevels.push({ name: element.name, id: element.id.toLowerCase() });
            });
            charms.forEach(element => {
                if(element)
                    Charms.push({ name: element.name, id: element.id.toLowerCase() });
            });
            charmLevels.forEach(element => {
                if(element)
                    CharmLevels.push({ name: element.name, id: element.id.toLowerCase() });
            });
            playerCards.forEach(element => {
                if(element)
                    PlayerCards.push({ name: element.name, id: element.id.toLowerCase() });
            });
            playerTitles.forEach(element => {
                if(element)
                    PlayerTitles.push({ name: element.name, id: element.id.toLowerCase() });
            });

            const AllItems = {
                characters: Characters,
                maps: Maps,
                chromas: Chromas,
                skins: Skins,
                skinLevels: SkinLevels,
                equips: Equips,
                gamemodes: GameModes,
                sprays: Sprays,
                sprayLevels: SprayLevels,
                charms: Charms,
                charmLevels: CharmLevels,
                playerCards: PlayerCards,
                playerTitles: PlayerTitles,
            }

            return AllItems;
        } else if(JSON.stringify(this.data).includes("Subject")) {
            const Subject = this.data.Subject;
            const Version = this.data.Version;
            const guns = this.data.Guns;
            const Identity = this.data.Identity;
            const sprays = this.data.Sprays;
            const GunIDs = {
                Odin: '63e6c2b6-4a8e-869c-3d4c-e38355226584',
                Ares: '55d8a0f4-4274-ca67-fe2c-06ab45efdf58',
                Vandal: '9c82e19d-4575-0200-1a81-3eacf00cf872',
                Bulldog:'ae3de142-4d85-2547-dd26-4e90bed35cf7',
                Phantom:'ee8e8d15-496b-07ac-e5f6-8fae5d4c7b1a',
                Judge:'ec845bf4-4f79-ddda-a3da-0db3774b2794',
                Bucky:'910be174-449b-c412-ab22-d0873436b21b',
                Frenzy:'44d4e95c-4157-0037-81b2-17841bf2e8e3',
                Classic:'29a0cfab-485b-f5d5-779a-b59f85e204a8',
                Ghost:'1baa85b4-4c70-1284-64bb-6481dfc3bb4e',
                Sheriff:'e336c6b8-418d-9340-d77f-7a9e4cfe0702',
                Shorty:'42da8ccc-40d5-affc-beec-15aa47b42eda',
                Operator:'a03b24d3-4319-996d-0f8c-94bbfba1dfc7',
                Guardian:'4ade7faa-4cf1-8376-95ef-39884480959b',
                Marshal:'c4883e50-4494-202c-3ec3-6b8a9284f00b',
                Spectre:'462080d1-4035-2937-7c09-27aa2a5c27a7',
                Stinger:'f7e1b454-4ad4-1063-ec0a-159e56b58941',
                Melee:'2f59173c-4bed-b6c3-2191-dea9b58be9c7',
            }
            const GunSkins = {};
            for(const GunID in GunIDs)
                GunSkins[GunID] = guns.find((gun)=> gun.ID === GunIDs[GunID]).SkinID
            const sprayIDs = {
                PreRound: "0814b2fe-4512-60a4-5288-1fbdcec6ca48",
                MidRound: "04af080a-4071-487b-61c0-5b9c0cfaac74",
                PostRound: "5863985e-43ac-b05d-cb2d-139e72970014"
            }
            const Sprays ={}
            for(const sprayID in sprayIDs)
                Sprays[sprayID] = sprays.find((spray)=> spray.EquipSlotID === sprayIDs[sprayID]).SprayID
    
            const PlayerInventory = {
                Subject,
                Version,
                GunSkins,
                Sprays,
                Identity
            }
            return PlayerInventory;
        }
    }
}
