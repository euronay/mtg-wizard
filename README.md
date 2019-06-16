![img](Logotype.png?raw=true)

# MTG Wizard #
Search for Magic: The Gathering™ cards from within Google Assistant. This is the engine for the *MTG Wizard* assistant.


## Usage ##
Open Google Assistant and say ```Talk to MTG Wizard```

To search for cards simply say a card name; part of a card name; or to look for a specific card add *from set*. Examples:

```
Lightning Bolt
Jace from Eternal Masters
Glacial fortress from M13
```
If multiple cards are found, you will be presented with a list of choices. Click on the card to get more information.

Say ```Random``` for a random card!

Just keep saying the name of cards, and MTG Wizard will try and find them.

### Options ###

Once you have found a card, you can say a phrase including one of the following phrases to perform the action.

| Phrases | Action |
| --- | --- |
| 'printings', 'reprints', 'sets' | Search for all sets where the selected card was reprinted |
| 'flip', 'transform' | If the card is a Double faced or meld card, view the other side |

### Deployment ###

Note this is for my reference - if you are forking this repo, you need to set up your own project on [Google Actions](https://console.actions.google.com)

For prod:
```
firebase use default
firebase deploy

gactions update --action_package .\action.json --project scrybot-mtg
```

For test:
```
firebase use test
firebase deploy

gactions update --action_package .\action-test.json --project scrybot-test
```

### Contributors ❤️ ###

Huge thanks to the following contibutors:

- [@richardbmx](https://github.com/richardbmx) for the MTG Wizard logo

### Legal Stuff ###

The literal and graphical information presented in this app about Magic: The Gathering, including card images, the mana symbols, and Oracle text, is copyright Wizards of the Coast, LLC, a subsidiary of Hasbro, Inc. This app is not produced by, endorsed by, supported by, or affiliated with Wizards of the Coast.

Card data and images are provided by [Scryfall](www.scryfall.com). This app is not produced by, endorsed by, supported by or affiliated with Scryfall, LLC.

[Privacy Policy](PrivacyPolicy.md)

[Terms and Conditions](TermsConditions.md)

[License](License.md)

[Logo Copyright](LogoCopyright.md)