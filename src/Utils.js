import { HeroDataBase, GameMode, rank } from "./HeroDataBase"

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

export const getGameMode = (params) => {
    for (var i = 0; i < GameMode.length; i++) {
        if (GameMode[i].id === params.value) {
            var value = GameMode[i].name.replace('game_mode_', '').replace('_', ' ')
            const arr = value.split(" ")
            for (var i = 0; i < arr.length; i++) {
                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
            }
            return arr.join(" ")
        }
    }
}

export const getDuration = (params) => {
    var min = Math.floor(params.value / 60)
    var seconds = params.value - (min * 60).toFixed(2)
    return str_pad_left(min, '0', 2) + ':' + str_pad_left(seconds, '0', 2)
}

function str_pad_left(string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
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

export const getCountry = (code) => {
    const regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' })
    return regionNamesInEnglish.of(code)
}

export const getRole = (role) => {
    switch (role) {
        case 1:
            return 'Carry';

        case 2:
            return 'Midlane';

        case 3:
            return 'Offlane'

        case 4:
            return 'Support'

        case 5:
            return 'Hard Support'

        default:
            break;
    }
}

export const getRankByTier = (params) => {
   var index = rank.findLastIndex((element) => element.rank_tier <= params.value)
   var data = 'N/A'
   if(index !== -1){
    data = rank[index].name
   }
   return data

}

export const getRankByMMR = (mmr) => {
    var index = rank.findLastIndex((element) => element.mmr <= mmr)
    return rank[index].name
 }