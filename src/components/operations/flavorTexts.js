const flavorTexts = [
  `"Anything can happen when patience is scarce and wine is abundant."`, 
  `"Books can be replaced; a prize student cannot. Be patient." —Urza, to Barrin"`, 
  `"Sorin has gathered grudges for centuries, patiently awaiting the day he can exact the perfect vengeance."`,
  `"Patience, mage. Killing you now would be too easy."`,
  `"The three wizards knew only that this isle held a great mystery—and that patience alone would solve it."`,
  `"To consult a sphinx is a test in patience. Perhaps that's the point."`,
  `"Ages ago, a party of elves took cover to let one pass. They're still waiting."`,
  "Realizing they weren't getting past the fog, the elves did the only thing they could do: wait.",
  "Barrin waited for the nausea to pass or for Urza to say something else. He waited in vain.",
  "The Multiverse is filled with limitless power just waiting for someone to reach out and seize it.",
  "Saffi, wait for me",
  "It is said that the wind will blow the world past if you wait long enough.",
  `"Arcum is a babbling fool! Phyrexian technology is our greatest blessing. Take this delightful trinket for instance . . ."
  —Heidar, Rimewind master`,
  `"In the gathering there is strength for all who founder, renewal for all who languish, love for all who sing."
  —Song of All, canto 642`,
  `"The panic is amusing, but the real fun comes when the spell passes and the villagers start looking for a scapegoat."
  —Ludevic, necro-alchemist`,
  `"It is finished. Now the real work can begin."
  —Tezzeret`,
  "Years of attempts have brought the goblins no closer to growing a sausage tree.",
  `
  "Day 31: I finally succeeded in my time reversal experiment!
  "Day 30: I might have a problem here."
  —Journal of the Prime Izmagnus`,
  `"Until you have lived as a statue, do not talk to me of pigeons."
  —Karn, silver golem`
]

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffleArray(flavorTexts)

export default flavorTexts