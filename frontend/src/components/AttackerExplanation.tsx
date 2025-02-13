import styled from "styled-components";

const StyledContainer = styled.div`
  padding: 0 10px;
`;

export default function AttackerExplanation() {
  return <StyledContainer>
    <h3>Why Attack?</h3>
    <p>When it comes to Dynamax Battles, it's tempting to think of the format as a battle of endurance - after all, you can't revive your Pokemon if they get knocked out. However, attackers are very important! Despite lacking visible timers as seen in raid battles, Dynamax battles have their own version of a raid timer - the enraged status of boss Pokemon. When a boss Pokemon indicates that it is "getting desperate", its attacks will exponentially increase in damage to the point where it will be able to knock out your tankiest Pokemon even through shields and with full health. This is where attacker Pokemon are vital. It is equally important to be chipping away at a boss Pokemon's health to ensure that the enraged status does not come into play.</p>
    <h3>Gigantamax vs. Dynamax</h3>
    <p>Importantly, the attacker role is where Gigantamax Pokemon shine. Gigantamax Pokemon specialize in a particular G-Max Move that is exclusive to their species - but when it comes to attacking, these moves are more than meets the eye. See the following table for the base damage outputs for a G-Max move compared to its Dynamax counterpart:
      <table>
        <thead>
          <tr>
            <th>Level</th>
            <th>Max Flare</th>
            <th>G-Max Wildfire</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Lv.1</td>
            <td>250</td>
            <td>350</td>
          </tr>
          <tr>
            <td>Lv.2</td>
            <td>300</td>
            <td>400</td>
          </tr>
          <tr>
            <td>Lv.3</td>
            <td>350</td>
            <td>450</td>
          </tr>
        </tbody>
      </table>
      As you can see above, a Lv. 3 Max Flare from a normal Dynamax Charizard is equivalent to an unpowered Lv. 1 G-Max Wildfire coming from a Gigantamax Charizard! This disparity in power between max moves can make a world of difference when preparing for a tough Max Battle. Pokemon with a low attack stat like G-Max Lapras can actually out-damage non-Gigantamax Pokemon so long as you invest in its G-Max Resonance move.
    </p>
    <h3>Strategies for Attackers</h3>
    <p>Most often, the Pokemon you'll want to specialize into an attacker role won't have a lot of defensive stats as well to lean on - this means that some of the best attackers like Inteleon and Gengar will not survive more than a hit or two from a Dynamax boss. Instead, focus on switching into your attacker Pokemon when the coast is clear. Some of these scenarios include:
      <ul>
        <li>Dynamax Phase: When your team's Max meter has completely filled, you have an opportunity to switch your current Pokemon to another. Take advantage of this - switch in your hard hitting attacker and spam Lv. 3 Max moves to devastating effect!</li>
        <li>While a Teammate Tanks: If one of your teammates can establish shields on their active Pokemon, use that opportunity to switch into your attacker. Shields taunt the Dynamax boss to target only the shielded Pokemon with single-target attacks until all shields have been broken. This can create a safe window to swap in an attacker to chip away with fast attacks. Be wary though of the boss "preparing a large attack" as this indicates a spread move is coming and your teammate's taunt will be ineffective at preventing your Pokemon from taking damage.</li>
      </ul>
    </p>
  </StyledContainer>;
}
