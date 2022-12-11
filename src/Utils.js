import { HeroDataBase } from "./HeroDataBase"

export const convertDate = (date) => {
    var d = new Date(date);
    var month = d.getUTCMonth() + 1
    var dates = d.getUTCDate() + "-" + month + "-" + d.getUTCFullYear()
    return dates
}

export const getHero = (params) => {
    for (var i = 0; i < HeroDataBase.length; i++) {
        if (params.value === HeroDataBase[i].id) {
            return HeroDataBase[i].localized_name
        }
    }
}

export const getHeroAvatar = (params) => {
    for (var i = 0; i < HeroDataBase.length; i++) {
        if (params.value === HeroDataBase[i].id) {
            // var name = '' + HeroDataBase[i].localized_name
            // var result = name.toLocaleLowerCase().replace(/ /g, '')
            var link = HeroDataBase[i].avatar
            return link
        }
    }

}

export const getTeam = (params) => {
    if (params.value > 127) {
        return "Dire"
    } else {
        return "Radiant"
    }
}

export const getResult = (params) => {
    if (params.row.player_slot > 127) {
        if (params.value) {
            return "Lost"
        } else {
            return "Win"
        }
    } else {
        if (params.value) {
            return "Win"
        } else {
            return "Lost"
        }
    }
}

export const generateRandom = () => {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}