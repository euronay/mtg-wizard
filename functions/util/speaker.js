module.exports = class Speaker {
    static speak(card){
        return this.filterMana(`${card.rarity}. ${card.getManaCostAndType()}. ${card.getBodyText()}`);
    }

    static filterMana(text){
        
        return text
        .replace(/{W}/g, "{White}")    
        .replace(/{U}/g, "{Blue}")
        .replace(/{B}/g, "{Black}")
        .replace(/{R}/g, "{Red}")
        .replace(/{G}/g, "{Green}")
        .replace(/{C}/g, "{Colorless}")
        .replace(/{S}/g, "{Snow}")
        .replace(/{W\/P}/g, "{Phyrexian White}")    
        .replace(/{U\/P}/g, "{Phyrexian Blue}")
        .replace(/{B\/P}/g, "{Phyrexian Black}")
        .replace(/{R\/P}/g, "{Phyrexian Red}")
        .replace(/{G\/P}/g, "{Phyrexian Green}")
        .replace(/{E}/g, "{Energy}");
    }
}