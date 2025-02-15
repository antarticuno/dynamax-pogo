import styled from "styled-components";

const StyledContainer = styled.div`
  padding: 0 10px;
`;

export default function HealerExplanation() {
  return <StyledContainer>
    <h3>Why Heal?</h3>
    <p>Dynamax battles can be rough for players due to the unavailability of healing items. Players enfranchised with the raid battling system will find that a fainted Pokemon quickly becomes a liability in max battles and with no way to participate outside of cheering. The max move, Max Spirit, can help alleviate these scenarios. Max Spirit, by design, allows users to heal quantities of HP to all active Pokemon in the battle - so long as they are not yet fully knocked out. Where its sibling, Max Guard, can largely eliminate the problems arising from single target moves, Max Spirit shines in combating the dreaded "large attack" that Dynamax bosses occasionally use. These moves attack the entire party at once and cannot be dodged, making them a guaranteed source of chip damage throughout the battle. Thus, the goal of a good healer is to remain vigilant for this threat of wear-and-tear on the party's Pokemon and strive to restore (if not exceed) the hit points lost to spread attacks.</p>
    <h3>Flashdance... What a Healing</h3>
    <p>Comparisons can be made between Max Guard and Max Spirit as both fulfill supportive roles during max battles. Their differences are made even more clear when considering the healing percentages per level of Max Spirit:</p>
    <table>
      <thead>
        <tr>
          <th>Level</th>
          <th>Percentage of the Healer's HP</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Lv.1</td>
          <td>8%</td>
        </tr>
        <tr>
          <td>Lv.2</td>
          <td>12%</td>
        </tr>
        <tr>
          <td>Lv.3</td>
          <td>16%</td>
        </tr>
      </tbody>
    </table>
    <p>
      There are a few key things to note here. For starters, the amount of HP healed will vary from healer to healer as the percentage healed goes off of the user's current stamina/HP stat. Secondly, you'll notice that even the bulkiest users of Max Spirit currently available (Lapras in the early days) max out at about 40ish HP - this is drastically lower than the 60HP gained from using Max Guard at Lv.3. However let us not forget that Max Spirit heals the <em>entire party</em> for that amount - meaning that in the best case (~120HP), the total amount of healed HP starts to resemble something more drastic (2 shields for the price of one Max Spirit). It also helps to note that Max Spirit is currently the only way to combat spread moves as well as they are unaffected by any active taunts.
    </p>
  </StyledContainer>;
}
