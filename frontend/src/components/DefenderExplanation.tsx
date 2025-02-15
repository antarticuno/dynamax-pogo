import styled from "styled-components";

const StyledContainer = styled.div`
  padding: 0 10px;
  text-align: justify;
`;

export default function DefenderExplanation() {
  return <StyledContainer>
    <h3>Why Defend?</h3>
    <p>Dynamax battles can be a test of teamwork for players - and the defender's role helps bring order to it all. Core to the function of the Max Guard move (outside of its ability to grant additional defenses to your Pokemon) is its ability to taunt the Dynamax boss. In game terminology, taunting is the concept of redirecting aggression/attacks towards the user - a selfless act that helps one's teammates specialize into dealing damage or healing. Without a good taunter, the boss Pokemon is free to round robin its powerful attacks towards any player in the battle, forcing each player to switch between roles regularly, and ultimately limiting the effectiveness of the team because of this lack of focus.</p>
    <h3>Maximizing Max Guard</h3>
    <p>When using the move, Max Guard, the player will first notice some blue shields appearing next to their active Pokemon. As mentioned before, these shields indicate that a taunt is active on that Pokemon, drawing fire from the boss Pokemon to it. However, the strength of these shields is largely comprised of the following factors:</p>
    <ul>
      <li>The level of the Max Guard move</li>
      <li>The defense stat of the defender</li>
      <li>The type resistances of the defender</li>
      <li>Whether you (the player) dodge</li>
    </ul>
    <p>Reference the following table for the durability of each shield based on the Max Guard level:</p>
    <table>
      <thead>
        <tr>
          <th>Level</th>
          <th>Durability</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Lv.1</td>
          <td>20HP</td>
        </tr>
        <tr>
          <td>Lv.2</td>
          <td>40HP</td>
        </tr>
        <tr>
          <td>Lv.3</td>
          <td>60HP</td>
        </tr>
      </tbody>
    </table>
    <p>
      Further, the defender's defense stat and overall type combination can have a massive impact on a shield's effectiveness. Consider the following two case studies:
    </p>
    <ol>
      <li>Zapdos vs. Excadrill
        <ul>
          <li>In this scenario, Excadrill's shields are particularly effective against all of Zapdos's attacks (electric, flying, rock). This however is due to Excadrill's type combination almost exclusively as Steel/Ground is able to resist each of the possible attacking types. If you consider Excadrill's defense stat, you'll notice that it is particularly lacking especially when compared to more conventional tanks like Blastoise or Metagross.</li>
        </ul>
      </li>
      <li>Kingler vs. Articuno
        <ul>
          <li>In this scenario, Articuno's shields are particularly effective against the majority of Kingler's attacks (water, normal, bug). This might be shocking considering Articuno only resists Kingler's bug attacks - however, when we consider Articuno's extremely high natural defense stat we can see just how powerful a high defense stat can be when it comes to minimizing incoming neutral type-effective attacks.</li>
        </ul>
      </li>
    </ol>
    <p>
      Ideally, the best defenders to bring into a Dynamax boss battle combine these strengths to hard counter anything the boss might throw at them.
    </p>
    <h3>Dodging</h3>
    <p>Dodging targeted attacks is the final way that defenders can maximize their shield usage. The tips here apply to all players - when the three exclamation marks appear above your Pokemon's head, <em>stop attacking and swipe to the left/right!</em> If executed properly, the game should state that you dodged the attack on the right-hand side of the screen. This roughly halves the damage you would have taken otherwise and can prolong your shields (and thus your taunt effect) for even longer. This is why it is also recommended that for any defenders that you <em>only use fast attacks</em> as this minimizes any attack cooldowns that might otherwise prevent you from dodging effectively.</p>
  </StyledContainer>;
}