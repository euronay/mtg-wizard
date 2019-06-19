const assert = require('assert');
const CardFactory = require('../card/cardfactory.js');
const SplitCard = require('../card/splitcard.js');
const DualCard = require('../card/dualcard.js');

//#region test data
    const scavengingOozeData = {
        "object": "card",
        "id": "614d466e-f830-4a2f-8740-b416a15c67dd",
        "oracle_id": "1ff25f67-36a7-4cfa-a2b1-2135b5b6fb67",
        "multiverse_ids": [
            425959
        ],
        "mtgo_id": 63271,
        "mtgo_foil_id": 63272,
        "tcgplayer_id": 128655,
        "name": "Scavenging Ooze",
        "lang": "en",
        "released_at": "2017-03-17",
        "uri": "https://api.scryfall.com/cards/614d466e-f830-4a2f-8740-b416a15c67dd",
        "scryfall_uri": "https://scryfall.com/card/mm3/134/scavenging-ooze?utm_source=api",
        "layout": "normal",
        "highres_image": true,
        "image_uris": {
            "small": "https://img.scryfall.com/cards/small/en/mm3/134.jpg?1517813031",
            "normal": "https://img.scryfall.com/cards/normal/en/mm3/134.jpg?1517813031",
            "large": "https://img.scryfall.com/cards/large/en/mm3/134.jpg?1517813031",
            "png": "https://img.scryfall.com/cards/png/en/mm3/134.png?1517813031",
            "art_crop": "https://img.scryfall.com/cards/art_crop/en/mm3/134.jpg?1517813031",
            "border_crop": "https://img.scryfall.com/cards/border_crop/en/mm3/134.jpg?1517813031"
        },
        "mana_cost": "{1}{G}",
        "cmc": 2.0,
        "type_line": "Creature — Ooze",
        "oracle_text": "{G}: Exile target card from a graveyard. If it was a creature card, put a +1/+1 counter on Scavenging Ooze and you gain 1 life.",
        "power": "2",
        "toughness": "2",
        "colors": [
            "G"
        ],
        "color_identity": [
            "G"
        ],
        "legalities": {
            "standard": "not_legal",
            "future": "not_legal",
            "frontier": "not_legal",
            "modern": "legal",
            "legacy": "legal",
            "pauper": "not_legal",
            "vintage": "legal",
            "penny": "not_legal",
            "commander": "legal",
            "duel": "legal",
            "oldschool": "not_legal"
        },
        "games": [
            "mtgo",
            "paper"
        ],
        "reserved": false,
        "foil": true,
        "nonfoil": true,
        "oversized": false,
        "promo": false,
        "reprint": true,
        "variation": false,
        "set": "mm3",
        "set_name": "Modern Masters 2017",
        "set_type": "masters",
        "set_uri": "https://api.scryfall.com/sets/02624962-f727-4c31-bbf2-a94fa6c5b653",
        "set_search_uri": "https://api.scryfall.com/cards/search?order=set&q=e%3Amm3&unique=prints",
        "scryfall_set_uri": "https://scryfall.com/sets/mm3?utm_source=api",
        "rulings_uri": "https://api.scryfall.com/cards/614d466e-f830-4a2f-8740-b416a15c67dd/rulings",
        "prints_search_uri": "https://api.scryfall.com/cards/search?order=released&q=oracleid%3A1ff25f67-36a7-4cfa-a2b1-2135b5b6fb67&unique=prints",
        "collector_number": "134",
        "digital": false,
        "rarity": "rare",
        "flavor_text": "In nature, not a single bone or scrap of flesh goes to waste.",
        "illustration_id": "41b9c15f-47c8-49f6-9c93-7092da0ab89b",
        "card_back_id": "0aeebaf5-8c7d-4636-9e82-8c27447861f7",
        "artist": "Austin Hsu",
        "border_color": "black",
        "frame": "2015",
        "full_art": false,
        "textless": false,
        "booster": true,
        "story_spotlight": false,
        "promo_types": [],
        "edhrec_rank": 390,
        "prices": {
            "usd": "4.48",
            "usd_foil": "5.08",
            "eur": "3.99",
            "tix": "5.43"
        },
        "related_uris": {
            "gatherer": "https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=425959",
            "tcgplayer_decks": "https://decks.tcgplayer.com/magic/deck/search?contains=Scavenging+Ooze&page=1&partner=Scryfall&utm_campaign=affiliate&utm_medium=scryfall&utm_source=scryfall",
            "edhrec": "http://edhrec.com/route/?cc=Scavenging+Ooze",
            "mtgtop8": "http://mtgtop8.com/search?MD_check=1&SB_check=1&cards=Scavenging+Ooze"
        },
        "purchase_uris": {
            "tcgplayer": "https://shop.tcgplayer.com/product/productsearch?id=128655&partner=Scryfall&utm_campaign=affiliate&utm_medium=scryfall&utm_source=scryfall",
            "cardmarket": "https://www.cardmarket.com/en/Magic/Products/Singles/Modern-Masters-2017/Scavenging-Ooze?referrer=scryfall&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall",
            "cardhoarder": "https://www.cardhoarder.com/cards/63271?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall"
        }
    };

    const chandraData = {
        "object": "card",
        "id": "49fdd0d3-7140-4c12-a41c-37eedd986d9e",
        "oracle_id": "0c2a9131-f3d7-4f71-8bcc-3c169574b2e3",
        "multiverse_ids": [
            407614
        ],
        "mtgo_id": 59361,
        "mtgo_foil_id": 59362,
        "tcgplayer_id": 110867,
        "name": "Chandra, Flamecaller",
        "lang": "en",
        "released_at": "2016-01-22",
        "uri": "https://api.scryfall.com/cards/49fdd0d3-7140-4c12-a41c-37eedd986d9e",
        "scryfall_uri": "https://scryfall.com/card/ogw/104/chandra-flamecaller?utm_source=api",
        "layout": "normal",
        "highres_image": true,
        "image_uris": {
            "small": "https://img.scryfall.com/cards/small/en/ogw/104.jpg?1517813031",
            "normal": "https://img.scryfall.com/cards/normal/en/ogw/104.jpg?1517813031",
            "large": "https://img.scryfall.com/cards/large/en/ogw/104.jpg?1517813031",
            "png": "https://img.scryfall.com/cards/png/en/ogw/104.png?1517813031",
            "art_crop": "https://img.scryfall.com/cards/art_crop/en/ogw/104.jpg?1517813031",
            "border_crop": "https://img.scryfall.com/cards/border_crop/en/ogw/104.jpg?1517813031"
        },
        "mana_cost": "{4}{R}{R}",
        "cmc": 6.0,
        "type_line": "Legendary Planeswalker — Chandra",
        "oracle_text": "+1: Create two 3/1 red Elemental creature tokens with haste. Exile them at the beginning of the next end step.\n0: Discard all the cards in your hand, then draw that many cards plus one.\n−X: Chandra, Flamecaller deals X damage to each creature.",
        "loyalty": "4",
        "colors": [
            "R"
        ],
        "color_identity": [
            "R"
        ],
        "all_parts": [
            {
                "object": "related_card",
                "id": "49fdd0d3-7140-4c12-a41c-37eedd986d9e",
                "component": "combo_piece",
                "name": "Chandra, Flamecaller",
                "type_line": "Legendary Planeswalker — Chandra",
                "uri": "https://api.scryfall.com/cards/49fdd0d3-7140-4c12-a41c-37eedd986d9e"
            },
            {
                "object": "related_card",
                "id": "bc6f27f7-0248-4c04-8022-41073966e4d8",
                "component": "token",
                "name": "Elemental",
                "type_line": "Token Creature — Elemental",
                "uri": "https://api.scryfall.com/cards/bc6f27f7-0248-4c04-8022-41073966e4d8"
            }
        ],
        "legalities": {
            "standard": "not_legal",
            "future": "not_legal",
            "frontier": "legal",
            "modern": "legal",
            "legacy": "legal",
            "pauper": "not_legal",
            "vintage": "legal",
            "penny": "not_legal",
            "commander": "legal",
            "duel": "legal",
            "oldschool": "not_legal"
        },
        "games": [
            "mtgo",
            "paper"
        ],
        "reserved": false,
        "foil": true,
        "nonfoil": true,
        "oversized": false,
        "promo": false,
        "reprint": false,
        "variation": false,
        "set": "ogw",
        "set_name": "Oath of the Gatewatch",
        "set_type": "expansion",
        "set_uri": "https://api.scryfall.com/sets/cd51d245-8f95-45b0-ab5f-e2b3a3eb5dfe",
        "set_search_uri": "https://api.scryfall.com/cards/search?order=set&q=e%3Aogw&unique=prints",
        "scryfall_set_uri": "https://scryfall.com/sets/ogw?utm_source=api",
        "rulings_uri": "https://api.scryfall.com/cards/49fdd0d3-7140-4c12-a41c-37eedd986d9e/rulings",
        "prints_search_uri": "https://api.scryfall.com/cards/search?order=released&q=oracleid%3A0c2a9131-f3d7-4f71-8bcc-3c169574b2e3&unique=prints",
        "collector_number": "104",
        "digital": false,
        "rarity": "mythic",
        "illustration_id": "cfa43dc0-2fab-48ec-890c-448b9bf3ada7",
        "card_back_id": "0aeebaf5-8c7d-4636-9e82-8c27447861f7",
        "artist": "Jason Rainville",
        "border_color": "black",
        "frame": "2015",
        "full_art": false,
        "textless": false,
        "booster": true,
        "story_spotlight": false,
        "promo_types": [],
        "edhrec_rank": 1263,
        "prices": {
            "usd": "2.22",
            "usd_foil": "8.28",
            "eur": "2.33",
            "tix": "0.02"
        },
        "related_uris": {
            "gatherer": "https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=407614",
            "tcgplayer_decks": "https://decks.tcgplayer.com/magic/deck/search?contains=Chandra%2C+Flamecaller&page=1&partner=Scryfall&utm_campaign=affiliate&utm_medium=scryfall&utm_source=scryfall",
            "edhrec": "http://edhrec.com/route/?cc=Chandra%2C+Flamecaller",
            "mtgtop8": "http://mtgtop8.com/search?MD_check=1&SB_check=1&cards=Chandra%2C+Flamecaller"
        },
        "purchase_uris": {
            "tcgplayer": "https://shop.tcgplayer.com/product/productsearch?id=110867&partner=Scryfall&utm_campaign=affiliate&utm_medium=scryfall&utm_source=scryfall",
            "cardmarket": "https://www.cardmarket.com/en/Magic/Products/Singles/Oath-of-the-Gatewatch/Chandra-Flamecaller?referrer=scryfall&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall",
            "cardhoarder": "https://www.cardhoarder.com/cards/59361?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall"
        }
    };

    const wearTearData =  {
        "object": "card",
        "id": "d169a3b2-18ae-4414-98ef-d879676fdcc0",
        "oracle_id": "9842734c-1eac-4509-a731-4c22017ae586",
        "multiverse_ids": [
            368950
        ],
        "mtgo_id": 48524,
        "tcgplayer_id": 67878,
        "name": "Wear // Tear",
        "lang": "en",
        "released_at": "2013-05-03",
        "uri": "https://api.scryfall.com/cards/d169a3b2-18ae-4414-98ef-d879676fdcc0",
        "scryfall_uri": "https://scryfall.com/card/dgm/135/wear-tear?utm_source=api",
        "layout": "split",
        "highres_image": true,
        "image_uris": {
            "small": "https://img.scryfall.com/cards/small/en/dgm/135a.jpg?1520204292",
            "normal": "https://img.scryfall.com/cards/normal/en/dgm/135a.jpg?1520204292",
            "large": "https://img.scryfall.com/cards/large/en/dgm/135a.jpg?1520204292",
            "png": "https://img.scryfall.com/cards/png/en/dgm/135a.png?1520204292",
            "art_crop": "https://img.scryfall.com/cards/art_crop/en/dgm/135a.jpg?1520204292",
            "border_crop": "https://img.scryfall.com/cards/border_crop/en/dgm/135a.jpg?1520204292"
        },
        "mana_cost": "{1}{R} // {W}",
        "cmc": 3.0,
        "type_line": "Instant // Instant",
        "colors": [
            "R",
            "W"
        ],
        "color_identity": [
            "R",
            "W"
        ],
        "card_faces": [
            {
                "object": "card_face",
                "name": "Wear",
                "mana_cost": "{1}{R}",
                "type_line": "Instant",
                "oracle_text": "Destroy target artifact.\nFuse (You may cast one or both halves of this card from your hand.)",
                "watermark": "boros",
                "artist": "Ryan Pancoast",
                "illustration_id": "35dc8f1e-5c26-4f3f-98eb-62123968a04f"
            },
            {
                "object": "card_face",
                "name": "Tear",
                "mana_cost": "{W}",
                "type_line": "Instant",
                "oracle_text": "Destroy target enchantment.\nFuse (You may cast one or both halves of this card from your hand.)",
                "watermark": "boros",
                "artist": "Ryan Pancoast"
            }
        ],
        "legalities": {
            "standard": "not_legal",
            "future": "not_legal",
            "frontier": "not_legal",
            "modern": "legal",
            "legacy": "legal",
            "pauper": "not_legal",
            "vintage": "legal",
            "penny": "not_legal",
            "commander": "legal",
            "duel": "legal",
            "oldschool": "not_legal"
        },
        "games": [
            "mtgo",
            "paper"
        ],
        "reserved": false,
        "foil": true,
        "nonfoil": true,
        "oversized": false,
        "promo": false,
        "reprint": false,
        "variation": false,
        "set": "dgm",
        "set_name": "Dragon's Maze",
        "set_type": "expansion",
        "set_uri": "https://api.scryfall.com/sets/c8bd8520-cd98-45cd-b533-8d40c2087426",
        "set_search_uri": "https://api.scryfall.com/cards/search?order=set&q=e%3Adgm&unique=prints",
        "scryfall_set_uri": "https://scryfall.com/sets/dgm?utm_source=api",
        "rulings_uri": "https://api.scryfall.com/cards/d169a3b2-18ae-4414-98ef-d879676fdcc0/rulings",
        "prints_search_uri": "https://api.scryfall.com/cards/search?order=released&q=oracleid%3A9842734c-1eac-4509-a731-4c22017ae586&unique=prints",
        "collector_number": "135",
        "digital": false,
        "rarity": "uncommon",
        "illustration_id": "35dc8f1e-5c26-4f3f-98eb-62123968a04f",
        "card_back_id": "0aeebaf5-8c7d-4636-9e82-8c27447861f7",
        "artist": "Ryan Pancoast",
        "border_color": "black",
        "frame": "2003",
        "full_art": false,
        "textless": false,
        "booster": true,
        "story_spotlight": false,
        "promo_types": [],
        "edhrec_rank": 1006,
        "prices": {
            "usd": "1.78",
            "usd_foil": "11.38",
            "eur": "1.76",
            "tix": "0.28"
        },
        "related_uris": {
            "gatherer": "https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=368950",
            "tcgplayer_decks": "https://decks.tcgplayer.com/magic/deck/search?contains=Wear+%2F%2F+Tear&page=1&partner=Scryfall&utm_campaign=affiliate&utm_medium=scryfall&utm_source=scryfall",
            "edhrec": "http://edhrec.com/route/?cc=Wear",
            "mtgtop8": "http://mtgtop8.com/search?MD_check=1&SB_check=1&cards=Wear+%2F%2F+Tear"
        },
        "purchase_uris": {
            "tcgplayer": "https://shop.tcgplayer.com/product/productsearch?id=67878&partner=Scryfall&utm_campaign=affiliate&utm_medium=scryfall&utm_source=scryfall",
            "cardmarket": "https://www.cardmarket.com/en/Magic/Products/Singles/Dragons-Maze/Wear-Tear?referrer=scryfall&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall",
            "cardhoarder": "https://www.cardhoarder.com/cards/48524?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall"
        }
    };

    const nissaData = {
        "object": "card",
        "id": "ff0063da-ab6b-499d-8e87-8b34d46f0372",
        "oracle_id": "35754a21-9fba-4370-a254-292918a777ba",
        "multiverse_ids": [
            398438,
            398432
        ],
        "mtgo_id": 58056,
        "mtgo_foil_id": 58057,
        "tcgplayer_id": 100021,
        "name": "Nissa, Vastwood Seer // Nissa, Sage Animist",
        "lang": "en",
        "released_at": "2015-07-17",
        "uri": "https://api.scryfall.com/cards/ff0063da-ab6b-499d-8e87-8b34d46f0372",
        "scryfall_uri": "https://scryfall.com/card/ori/189/nissa-vastwood-seer-nissa-sage-animist?utm_source=api",
        "layout": "transform",
        "highres_image": true,
        "cmc": 3.0,
        "type_line": "Legendary Creature — Elf Scout // Legendary Planeswalker — Nissa",
        "color_identity": [
            "G"
        ],
        "card_faces": [
            {
                "object": "card_face",
                "name": "Nissa, Vastwood Seer",
                "mana_cost": "{2}{G}",
                "type_line": "Legendary Creature — Elf Scout",
                "oracle_text": "When Nissa, Vastwood Seer enters the battlefield, you may search your library for a basic Forest card, reveal it, put it into your hand, then shuffle your library.\nWhenever a land enters the battlefield under your control, if you control seven or more lands, exile Nissa, then return her to the battlefield transformed under her owner's control.",
                "colors": [
                    "G"
                ],
                "power": "2",
                "toughness": "2",
                "artist": "Wesley Burt",
                "illustration_id": "a7c585e9-d1b0-4c1c-953c-ee851f1551cc",
                "image_uris": {
                    "small": "https://img.scryfall.com/cards/small/en/ori/189a.jpg?1546396006",
                    "normal": "https://img.scryfall.com/cards/normal/en/ori/189a.jpg?1546396006",
                    "large": "https://img.scryfall.com/cards/large/en/ori/189a.jpg?1546396006",
                    "png": "https://img.scryfall.com/cards/png/en/ori/189a.png?1546396006",
                    "art_crop": "https://img.scryfall.com/cards/art_crop/en/ori/189a.jpg?1546396006",
                    "border_crop": "https://img.scryfall.com/cards/border_crop/en/ori/189a.jpg?1546396006"
                }
            },
            {
                "object": "card_face",
                "name": "Nissa, Sage Animist",
                "mana_cost": "",
                "type_line": "Legendary Planeswalker — Nissa",
                "oracle_text": "+1: Reveal the top card of your library. If it's a land card, put it onto the battlefield. Otherwise, put it into your hand.\n−2: Create a legendary 4/4 green Elemental creature token named Ashaya, the Awoken World.\n−7: Untap up to six target lands. They become 6/6 Elemental creatures. They're still lands.",
                "colors": [
                    "G"
                ],
                "color_indicator": [
                    "G"
                ],
                "loyalty": "3",
                "artist": "Wesley Burt",
                "illustration_id": "434f4e61-10b0-4d97-b275-73aa109ea9aa",
                "image_uris": {
                    "small": "https://img.scryfall.com/cards/small/en/ori/189b.jpg?1546396006",
                    "normal": "https://img.scryfall.com/cards/normal/en/ori/189b.jpg?1546396006",
                    "large": "https://img.scryfall.com/cards/large/en/ori/189b.jpg?1546396006",
                    "png": "https://img.scryfall.com/cards/png/en/ori/189b.png?1546396006",
                    "art_crop": "https://img.scryfall.com/cards/art_crop/en/ori/189b.jpg?1546396006",
                    "border_crop": "https://img.scryfall.com/cards/border_crop/en/ori/189b.jpg?1546396006"
                }
            }
        ],
        "all_parts": [
            {
                "object": "related_card",
                "id": "ff0063da-ab6b-499d-8e87-8b34d46f0372",
                "component": "combo_piece",
                "name": "Nissa, Vastwood Seer // Nissa, Sage Animist",
                "type_line": "Legendary Creature — Elf Scout // Legendary Planeswalker — Nissa",
                "uri": "https://api.scryfall.com/cards/ff0063da-ab6b-499d-8e87-8b34d46f0372"
            },
            {
                "object": "related_card",
                "id": "0affd414-f774-48d1-af9e-bff74e58e1ca",
                "component": "token",
                "name": "Ashaya, the Awoken World",
                "type_line": "Token Legendary Creature — Elemental",
                "uri": "https://api.scryfall.com/cards/0affd414-f774-48d1-af9e-bff74e58e1ca"
            }
        ],
        "legalities": {
            "standard": "not_legal",
            "future": "not_legal",
            "frontier": "legal",
            "modern": "legal",
            "legacy": "legal",
            "pauper": "not_legal",
            "vintage": "legal",
            "penny": "not_legal",
            "commander": "legal",
            "duel": "legal",
            "oldschool": "not_legal"
        },
        "games": [
            "mtgo",
            "paper"
        ],
        "reserved": false,
        "foil": true,
        "nonfoil": true,
        "oversized": false,
        "promo": false,
        "reprint": false,
        "variation": false,
        "set": "ori",
        "set_name": "Magic Origins",
        "set_type": "core",
        "set_uri": "https://api.scryfall.com/sets/0eeb9a9a-20ac-404d-b55f-aeb7a43a7f62",
        "set_search_uri": "https://api.scryfall.com/cards/search?order=set&q=e%3Aori&unique=prints",
        "scryfall_set_uri": "https://scryfall.com/sets/ori?utm_source=api",
        "rulings_uri": "https://api.scryfall.com/cards/ff0063da-ab6b-499d-8e87-8b34d46f0372/rulings",
        "prints_search_uri": "https://api.scryfall.com/cards/search?order=released&q=oracleid%3A35754a21-9fba-4370-a254-292918a777ba&unique=prints",
        "collector_number": "189",
        "digital": false,
        "rarity": "mythic",
        "card_back_id": "0aeebaf5-8c7d-4636-9e82-8c27447861f7",
        "artist": "Wesley Burt",
        "border_color": "black",
        "frame": "2015",
        "frame_effect": "originpwdfc",
        "full_art": false,
        "textless": false,
        "booster": true,
        "story_spotlight": false,
        "promo_types": [],
        "edhrec_rank": 1577,
        "prices": {
            "usd": "9.14",
            "usd_foil": "12.73",
            "eur": "6.18",
            "tix": "0.45"
        },
        "related_uris": {
            "gatherer": "https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=398438",
            "tcgplayer_decks": "https://decks.tcgplayer.com/magic/deck/search?contains=Nissa%2C+Vastwood+Seer&page=1&partner=Scryfall&utm_campaign=affiliate&utm_medium=scryfall&utm_source=scryfall",
            "edhrec": "http://edhrec.com/route/?cc=Nissa%2C+Vastwood+Seer",
            "mtgtop8": "http://mtgtop8.com/search?MD_check=1&SB_check=1&cards=Nissa%2C+Vastwood+Seer"
        },
        "purchase_uris": {
            "tcgplayer": "https://shop.tcgplayer.com/product/productsearch?id=100021&partner=Scryfall&utm_campaign=affiliate&utm_medium=scryfall&utm_source=scryfall",
            "cardmarket": "https://www.cardmarket.com/en/Magic/Products/Singles/Magic-Origins/Nissa-Vastwood-Seer-Nissa-Sage-Animist?referrer=scryfall&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall",
            "cardhoarder": "https://www.cardhoarder.com/cards/58056?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall"
        }
    };
//#endregion

describe('normal card', () => {
    describe('chandra', () => {
        var chandra = CardFactory.createCard(chandraData);
        it('should have correct name', () => {
            assert.equal(chandra.name, "Chandra, Flamecaller");
        });
        it('should have correct set', () => {
            assert.equal(chandra.set, "OGW");
        });
        it('should have correct set and rarity', () => {
            assert.equal(chandra.getSetAndRarity(), "Oath of the Gatewatch - Mythic");
        });
        it('should have correct mana cost and type', () => {
            assert.equal(chandra.getManaCostAndType(), "{4}{R}{R} Legendary Planeswalker — Chandra 4");
        });
        it('should have correct body text', () => {
            assert.equal(chandra.getBodyText(),"+1: Create two 3/1 red Elemental creature tokens with haste. Exile them at the beginning of the next end step.\n  \n0: Discard all the cards in your hand, then draw that many cards plus one.\n  \n−X: Chandra, Flamecaller deals X damage to each creature.");
        });
        it('should have correct prices', () => {
            assert.equal(chandra.getPrices(), "USD: 2.22 / EUR: 2.33");
        });
        it('should have correct image', () => {
            assert.equal(chandra.getImage(), "https://img.scryfall.com/cards/large/en/ogw/104.jpg?1517813031");
        });
    });

    describe('scavageng ooze', () => {
        var scavengingOoze = CardFactory.createCard(scavengingOozeData);
        it('should have correct name', () => {
            assert.equal(scavengingOoze.name, "Scavenging Ooze");
        });
        it('should have correct set', () => {
            assert.equal(scavengingOoze.set, "MM3");
        });
        it('should have correct set and rarity', () => {
            assert.equal(scavengingOoze.getSetAndRarity(), "Modern Masters 2017 - Rare");
        });
        it('should have correct mana cost and type', () => {
            assert.equal(scavengingOoze.getManaCostAndType(), "{1}{G} Creature — Ooze 2/2");
        });
        it('should have correct body text', () => {
            assert.equal(scavengingOoze.getBodyText(),"{G}: Exile target card from a graveyard. If it was a creature card, put a +1/+1 counter on Scavenging Ooze and you gain 1 life.");
        });
        it('should have correct prices', () => {
            assert.equal(scavengingOoze.getPrices(), "USD: 4.48 / EUR: 3.99");
        });
        it('should have correct image', () => {
            assert.equal(scavengingOoze.getImage(), "https://img.scryfall.com/cards/large/en/mm3/134.jpg?1517813031");
        });
    });
});

describe('split card', () => {
    describe('wear // tear', () => {
        var wearTear = CardFactory.createCard(wearTearData);
        it('should be a SplitCard', () => {
            assert(wearTear instanceof SplitCard);
        });
        it('should have correct name', () => {
            assert.equal(wearTear.name, "Wear // Tear");
        });
        it('should have correct set', () => {
            assert.equal(wearTear.set, "DGM");
        });
        it('should have correct set and rarity', () => {
            assert.equal(wearTear.getSetAndRarity(), "Dragon's Maze - Uncommon");
        });
        it('should have correct mana cost and type', () => {
            assert.equal(wearTear.getManaCostAndType(), "{1}{R} Instant // {W} Instant");
        });
        it('should have correct body text', () => {
            assert.equal(wearTear.getBodyText(),"**Wear**\n  \nDestroy target artifact.\n  \nFuse (You may cast one or both halves of this card from your hand.)\n  \n  \n**Tear**\n  \nDestroy target enchantment.\n  \nFuse (You may cast one or both halves of this card from your hand.)")
        });
        it('should have correct prices', () => {
            assert.equal(wearTear.getPrices(), "USD: 1.78 / EUR: 1.76");
        });
        it('should have correct image', () => {
            assert.equal(wearTear.getImage(), "https://img.scryfall.com/cards/large/en/dgm/135a.jpg?1520204292");
        });
    });
});

describe('dual card', () => {

    var nissa = CardFactory.createCard(nissaData);

    describe('nissa, vastwood seer', () => {
        it('should be a DualCard', () => {
            assert(nissa instanceof DualCard);
        });
        it('should have correct name', () => {
            assert.equal(nissa.name, "Nissa, Vastwood Seer // Nissa, Sage Animist");
        });
        it('should have correct display name', () => {
            assert.equal(nissa.getDisplayName(), "Nissa, Vastwood Seer");
        });
        it('should have correct set', () => {
            assert.equal(nissa.set, "ORI");
        });
        it('should have correct set and rarity', () => {
            assert.equal(nissa.getSetAndRarity(), "Magic Origins - Mythic");
        });
        it('should have correct mana cost and type', () => {
            assert.equal(nissa.getManaCostAndType(), "{2}{G} Legendary Creature — Elf Scout 2/2");
        });
        it('should have correct body text', () => {
            assert.equal(nissa.getBodyText(),"When Nissa, Vastwood Seer enters the battlefield, you may search your library for a basic Forest card, reveal it, put it into your hand, then shuffle your library.\n  \nWhenever a land enters the battlefield under your control, if you control seven or more lands, exile Nissa, then return her to the battlefield transformed under her owner's control.")
        });
        it('should have correct prices', () => {
            assert.equal(nissa.getPrices(), "USD: 9.14 / EUR: 6.18");
        });
        it('should have correct image', () => {
            assert.equal(nissa.getImage(), "https://img.scryfall.com/cards/large/en/ori/189a.jpg?1546396006");
        });
    });

    var nissa2 = CardFactory.createCard(nissaData);
    nissa2.flip();

    describe('nissa, sage animist', () => {
        it('should have correct display name', () => {
            assert.equal(nissa2.getDisplayName(), "Nissa, Sage Animist");
        });
        it('should have correct set', () => {
            assert.equal(nissa2.set, "ORI");
        });
        it('should have correct set and rarity', () => {
            assert.equal(nissa2.getSetAndRarity(), "Magic Origins - Mythic");
        });
        it('should have correct mana cost and type', () => {
            assert.equal(nissa2.getManaCostAndType(), "Legendary Planeswalker — Nissa 3");
        });
        it('should have correct body text', () => {
            assert.equal(nissa2.getBodyText(),"+1: Reveal the top card of your library. If it's a land card, put it onto the battlefield. Otherwise, put it into your hand.\n  \n−2: Create a legendary 4/4 green Elemental creature token named Ashaya, the Awoken World.\n  \n−7: Untap up to six target lands. They become 6/6 Elemental creatures. They're still lands.")
        });
        it('should have correct prices', () => {
            assert.equal(nissa2.getPrices(), "USD: 9.14 / EUR: 6.18");
        });
        it('should have correct image', () => {
            assert.equal(nissa2.getImage(), "https://img.scryfall.com/cards/large/en/ori/189b.jpg?1546396006");
        });
    });
});