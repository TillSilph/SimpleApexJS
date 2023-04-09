const config = require("./config.json")
const fetch = require('node-fetch')
async function later(ms) {
    return await new Promise(resolve => setTimeout(resolve, ms));
}

class SAJSNoQueue {
    constructor(token, options) {
        this.token=token;
        this.options = options;
        this.url='https://api.mozambiquehe.re/';
        this.quests = [];
    }
    rusMap(mapName) {
        const map = {
            "Kings Canyon":"Каньон Кингс",
            "World's Edge":"Край света",
            "Olympus":"Олимп",
            "Broken Moon":"Расколотая луна",
            "Storm Point":"Место бури",
            "Skulltown":"Город Черепов",
            "Wall":"Волл",
            "Siphon":"Лавовый сифон",
            "Overflow":"Извержение",
            "Fragment":"Восточный Фрагмент",
            "Caustic":"Зона Каустика",
            "Habitat":"Среда обитания",
            "Barometer":"Барометр",
            "Party Crasher":"Мираж Вояж"

        };
        return map[mapName]||mapName;
    }
    rusCraft(name) {
        const ammunition = {
            /*------------------------WEAPON-------------------------*/
            "mp_weapon_alternator_smg":"Сменщик",
            "mp_weapon_defender":"Энерговинтовка",
            "mp_weapon_esaw":"РП преданность",
            "mp_weapon_epg":"epg",
            "mp_weapon_shotgun":"EVA-8 АВТО",
            "mp_weapon_vinson":"Флэтлайн",
            "mp_weapon_g2":"Разведчик G7",
            "mp_weapon_energy_ar":"Хаос",
            "mp_weapon_hemlok":"Хемлок",
            "mp_weapon_sniper":"Крабер",
            "mp_weapon_dmr":"Длинный лук",
            "mp_weapon_lstar":"L-star",
            "mp_weapon_mastiff":"Мастифф",
            "mp_weapon_shotgun_pistol":"Мозамбик",
            "mp_weapon_semipistol":"P2020",
            "mp_weapon_energy_shotgun":"Миротворец",
            "mp_weapon_pdw":"Ищейка",
            "mp_weapon_rspn101":"R-301",
            "mp_weapon_r97":"R-99",
            "mp_weapon_autopistol":"RE-45",
            "mp_weapon_smart_pistol":"Умный пистолет",
            "mp_weapon_lmg":"Спитфайр",
            "mp_weapon_doubletake":"Тройной эффект",
            "mp_weapon_wingman":"Ведомый",
            "mp_weapon_volt":"Вольт",

            /*------------------------GRENADES-------------------------*/
            "mp_weapon_grenade_emp":"Дуговая звезда",
            "mp_weapon_frag_grenade":"Осколочная граната",
            "mp_weapon_thermite_grenade":"Зажигательная граната",

            /*------------------------OPTICS-------------------------*/ // я не могу найти
            /*-----SHORT_RANGE-----*/
            "optic_cq_hcog_classic": "1Х ГБОП Классика",//x1 HCOG Classic -
            "optic_cq_hcog_bruiser":"2Х ГБОП Брузер",//x2 HCOG Bruiser -
            "optic_cq_holosight":"1Х ГОЛОГРАФ",//x1 Holosight -
            "optic_cq_threat": "1Х ЦИФР. Поиск угроз",// x1 Digital Threat -
            "optic_cq_holosight_variable":"1Х-2Х Голограф.",//x1-2 Holosight Variable -
            /*-----MIDDLE_RANGE-----*/
            "optic_ranged_hcog":"3Х ГБОП \"Рейнджер\"",//x3 HCOG Ranger -
            "optic_ranged_aog_variable":"2Х-4Х Регулир. УОП",// x2-4 AOG Variable -
            /*-----LONG_RANGE-----*/
            "optic_sniper":"6Х Снайпер",//x6 Sniper -
            "optic_sniper_variable":"4Х-8Х Регулир. Снайпер",//x4-8 Sniper Variable -
            "optic_sniper_threat":"4Х-10Х Цифр. Поиск Угроз",// x4-10 Sniper Digital Threat -

            /*------------------------BARREL-------------------------*/
            "barrel_stabilizer_l1":"Стабилизатор 1ур.",//Level 1 -
            "barrel_stabilizer_l2":"Стабилизатор 2ур.",//Level 2 -
            "barrel_stabilizer_l3":"Стабилизатор 3ур.", // Level 3 -
            "barrel_stabilizer_l4_flash_hider":"Стабилизатор 4ур.",//Level 4(Gold) -

            /*------------------------STOCK-------------------------*/
            /*-----TACTICAL-----*/
            "stock_tactical_l1":"Приклад 1ур.", //Level 1 -
            "stock_tactical_l2":"Приклад 2ур.", //Level 2 -
            "stock_tactical_l3":"Приклад 3ур.", //Level 3 -
            /*-----SNIPER-----*/
            "stock_sniper_l1":"Снайперский Приклад 1ур.",//Level 1 -
            "stock_sniper_l2":"Снайперский Приклад 2ур.",//Level 2 -
            "stock_sniper_l3":"Снайперский Приклад 3ур.",//Level 3 -

            /*------------------------SHOTGUN_BOLTS-------------------------*/
            "shotgun_bolt_l1":"Затвор 1ур.",//Level 1 -// я не могу найти
            "shotgun_bolt_l2":"Затвор 2ур.", //Level 2 -// я не могу найти
            "shotgun_bolt_l3":"Затвор 3ур.",//Level 3 -// я не могу найти
            "bullets_mag_l1":"Увеличенный легкий магазин 1ур.",//Level 1 -
            "bullets_mag_l2":"Увеличенный легкий магазин 2ур.",//Level 2 -
            "bullets_mag_l3":"Увеличенный легкий магазин 3ур.", //Level 3 -

            /*------------------------MAGS-------------------------*/
            "highcal_mag_l1":"Увеличенный тяжелый магазин 1ур.",//Level 1 -
            "highcal_mag_l2":"Увеличенный тяжелый магазин 2ур.",//Level 2 -
            "highcal_mag_l3":"Увеличенный тяжелый магазин 3ур.", //Level 3 -
            "energy_mag_l1":"Увеличенный энергетический магазин 1ур.",//Level 1 -
            "energy_mag_l2":"Увеличенный энергетический магазин 2ур.",//Level 2 -
            "energy_mag_l3":"Увеличенный энергетический магазин 3ур.",//Level 3 -

            /*------------------------HOPUP-------------------------*/
            "hopup_turbocharger": "Модификатор",//Turbocharger =
            "hopup_selectfire": "Модификатор",//Selectfire Receiver =
            "hopup_energy_choke": "Модификатор",// Precision Choke =
            "hopup_unshielded_dmg":"Модификатор", //Hammerpoint Rounds =
            "hopup_highcal_rounds":"Модификатор", //Anvil Receiver =
            "hopup_double_tap":"Модификатор", //Double Tap =

            /*------------------------HELMET-------------------------*/
            "helmet_pickup_lv1":"Шлем 1ур.",
            "helmet_pickup_lv2":"Шлем 2ур.",
            "helmet_pickup_lv3":"Шлем 3ур.",
            "helmet_pickup_lv4_abilities":"Шлем 4ур.",

            /*------------------------BACKPACK-------------------------*/
            "backpack_pickup_lv1":"Рюкзак 1ур.",
            "backpack_pickup_lv2":"Рюкзак 2ур.",
            "backpack_pickup_lv3":"Рюкзак 3ур.",
            "backpack_pickup_lv4_revive_boost":"Рюкзак 4ур.",

            /*------------------------ARMOR/BODYSHIELD-------------------------*/
            "armor_pickup_lv1":"Броня 1ур.",
            "armor_pickup_lv2":"Броня 2ур.",
            "armor_pickup_lv3":"Броня 3ур.",
            "armor_pickup_lv4_all_fast":"Броня 4ур.",

            /*------------------------INCAPSHIELD/KNOCKDOWN_SHIELDS-------------------------*/
            "incapshield_pickup_lv1":"Нокдаун щит 1ур.",
            "incapshield_pickup_lv2":"Нокдаун щит 2ур.",
            "incapshield_pickup_lv3":"Нокдаун щит 3ур.",
            "incapshield_pickup_lv4_selfrevive":"Нокдаун щит 4ур.",
        };
        return ammunition[name]||name;
    }
    request(data){
        return fetch(this.url+data, {method: 'GET', headers: {"Authorization": this.token}})
            .then(response => response.json())
            .catch(err => null)
    }
    getCrafting({rus}) { // что щас крафтиться
        return this.request(`crafting`).then(back=>{
            if(rus) back.map(el=>el.bundleContent.map(el=>el.item=api.rusCraft(el.item)));
            return back
        })
    }
    getPlayerStatByName(playerName, platform="PC"){//стата по имени
        return this.request(`bridge?player=${playerName}&platform=${platform}`);
    }
    getPlayerStatById(playerUID, platform="PC"){//стата по id
        return this.request(`bridge?uid=${playerUID}&platform=${platform}"`);
    }
    getPlayerMatchHistory(playerUID, mode="BATTLE_ROYALE", start=0, end=604800, limit=10){//оно типо не доступно нам еще
        return this.request(`games?uid=${playerUID}&mode=${mode}$start=${start}&end=${end}&limit=${limit}`)
    }
    getLeaderBoard(hero="Mirage", platform="PC"){//оно типо не доступно нам еще
        return this.request(`leaderboard?legend=${hero}&key=KEY&platform=${platform}`)
    }
    getMap(mode=2, rus=true){//получаем карты
        return this.request(`maprotation?version=${mode}`).then(back=>{
            if(rus) for(const it of Object.keys(back)) {
                back[it].current.map = this.rusMap(back[it].current.map);
                back[it].next.map = this.rusMap(back[it].next.map)
            }
            return back
        });
    }
    getStore(){//магазин
        return this.request(`store`)
    }
    getNews(){//новости.. НОВОСТИ ПО АПИ ЗАЧЕМ??
        return this.request(`news`)
    }
    getServerStatus(){//ну это полезно, статус серверов
        return this.request(`servers`)
    }
    getPlayerUIDbyName(playerName, platform="PC"){// конвертация/получения uid оп имени
        return this.request(`nametouid?player=${playerName}&platform=${platform}`)
    }
}

class simpleApexJS extends SAJSNoQueue {
    constructor(token, options) {
        super(token, options);
        
        if(!options.rateLimit) options.rateLimit = 2000; //или 500 (я не знаю подключал ли Ваня дискорд) -Ка
        this.start();
    }
    get noQueue() {
        return new SAJSNoQueue(this.token, this.options)
    }
    addQuest(quest,settings) {
        return new Promise((resolve, reject) => {
            this.quests.push({quest,settings,resolve});
        });
    }
    addFastQuest(quest, settings) {
        return new Promise((resolve, reject) => {
            this.quests.unshift({quest,settings,resolve});
        });
    }
    async start() {
        while(true) {
            await this.nextQuest();
            await later(this.options.rateLimit);
        }
    }
    async nextQuest() {
        if(this.quests.length) {
            const {quest,settings,resolve,noDelete} = this.quests.splice(0,1)[0];
            if(noDelete) this.quests.push({quest,settings,resolve,noDelete});
            return await resolve(await super[quest](...settings));
        }
    }
    getCrafting(...options) { // что щас крафтиться
        return this.addQuest("getCrafting", options);
    }
    getPlayerStatByName(...options){//стата по имени
        return this.addQuest("getPlayerStatByName", options);
    }
    getPlayerStatById(...options){//стата по id
        return this.addQuest("getPlayerStatById", options);
    }
    getPlayerMatchHistory(...options){//оно типо не доступно нам еще
        return this.addQuest("getPlayerMatchHistory", options);
    }
    getLeaderBoard(...options){//оно типо не доступно нам еще
        return this.addQuest("getLeaderBoard", options);
    }
    getMap(...options){//получаем карты
        return this.addQuest("getMap", options);
    }
    getStore(...options){//магазин
        return this.addQuest("getStore", options);
    }
    getNews(...options){//новости.. НОВОСТИ ПО АПИ ЗАЧЕМ??
        return this.addQuest("getNews", options);
    }
    getServerStatus(...options){//ну это полезно, статус серверов
        return this.addQuest("getServerStatus", options);
    }
    getPlayerUIDbyName(...options){// конвертация/получения uid оп имени
        return this.addQuest("getPlayerUIDbyName", options);
    }
}

module.exports = simpleApexJS;
