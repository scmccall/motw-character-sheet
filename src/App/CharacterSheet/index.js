import styled from "styled-components"

const testInfo = {
  "name": "Buffy Summers",
  "playbook": "The Chosen",
  "harm": 3,
  "luck": 6,
  "experience": 2,
  "ratings": {
    "charm": 1,
    "cool": 2,
    "sharp": 1,
    "tough": 1,
    "weird": -1
  },
  "moves": [
    {
      "name": "Destiny’s Plaything",
      "description": "At the beginning of each mystery, roll +Weird to see what is revealed about your immediate future. On a 10+, the Keeper will reveal a useful detail about the coming mystery. On a 7-9 you get a vague hint about it. On a miss, something bad is going to happen to you."
    },
    {
      "name": "I’m Here For A Reason",
      "description": "There’s something you are destined to do. Work out the details with the Keeper, based on your fate. You cannot die until it comes to pass. If you die in play, then you must spend a Luck point. You will then, somehow, recover or be returned to life. Once your task is done (or you use up all your Luck), all bets are off."
    },
    {
      "name": "Invincible",
      "description": "You always count as having 2-armour. This doesn’t stack with other protection."
    }
  ],
  "weapons": [
    {
      "name": ".38 revolver",
      "harm": 2,
      "tags": [
        {
          "name": "Close",
          "url": "http://motwapi.com/api/v1/weapon-tags/close"
        },
        {
          "name": "Reload",
          "url": "http://motwapi.com/api/v1/weapon-tags/reload"
        },
        {
          "name": "Loud",
          "url": "http://motwapi.com/api/v1/weapon-tags/loud"
        }
      ]
    },
    {
      "name": "Big knife",
      "harm": 1,
      "tags": [
        {
          "name": "Hand",
          "url": "http://motwapi.com/api/v1/weapon-tags/hand"
        }
      ]
    }
  ],
}

function CharacterSheet() {
  return (
    <div>
      <Row label="Name" data={testInfo.name} />
      <Row label="Playbook" data={testInfo.playbook} />
      <RowWithIcon label="Harm" type="harm" pointsLeft={testInfo.harm} />
      <RowWithIcon label="Luck" type="luck" pointsLeft={testInfo.luck} />
      <RowWithExperienceBar label="Experience" experience={testInfo.experience} />
      <RowWithRatings label="Ratings" ratings={testInfo.ratings}/>
      <RowWithMoves label="Moves" moves={testInfo.moves} />
      <RowWithWeapons label="Weapons" weapons={testInfo.weapons}/>
    </div>
  );
};


function Row (props) {

  const RowLabel = styled.p`
    display: flex;
    float: left
  `;

  const RowData = styled.div`
  `;

  return (
      <Wrapper>
        <RowLabel>{props.label}: </RowLabel>
        <RowData>{props.data}</RowData>
      </Wrapper>
  );
};

function RowWithIcon (props) {
  let icons = [];
  let max = 7;
  let iconType;
  let buttons = [];
  let buttonType = "nes-btn is-error"
  if (props.type === "harm") {
    iconType = "nes-icon heart";
    buttons.push(
      <button type="button" class={buttonType}>+</button>
    );
    buttons.push(
      <button type="button" class={buttonType}>-</button>
    );
  } else if (props.type === "luck") {
    iconType = "nes-icon star";
    buttons.push(
      <button type="button" class={buttonType}>Spend Luck</button>
    );
  };
  for (let i = 0; i < props.pointsLeft; i++) {
    icons.push(<i class={iconType} />);
  };
  for (let i = 0; i < (max - props.pointsLeft); i++) {
    icons.push(<i class={iconType + " is-empty"} />);
  };

  let data = icons.concat(buttons);

  return (
      <Row label={props.label} data={data} />
  );
};

function RowWithExperienceBar (props) {

  const ExperienceValue = styled.p`
    display: flex;
    padding-left: 20px;
  `;

  let experienceBar = (
    <progress
      class="nes-progress is-warning"
      value={props.experience}
      max="5">
    </progress>
  );

  return (
    <Wrapper>
      <Row label={props.label} data={experienceBar} />
      <ExperienceValue> {props.experience}/5</ExperienceValue>
    </Wrapper>
  )
}

function RowWithRatings (props) {
  let ratingScores = new Map(Object.entries(props.ratings));
  let ratingsList = []
  ratingScores.forEach((value, key) => {
    ratingsList.push(
      <Row label={key} data={value} />
    );
  });

  return (
    <Wrapper>
      <Row label={props.label} data={ratingsList} />
    </Wrapper>
  );
}

function RowWithMoves (props) {
  let movesList = [];
  for (let move of props.moves) {
    movesList.push(
      <Row label={move.name} data={move.description} />
    );
  };

  return (
  <Wrapper>
    <Row label={props.label} data={movesList} />
  </Wrapper>
  );
};

function RowWithWeapons (props) {
  let weaponsList = [];
  for (let weapon of props.weapons) {
    let tags = []
    for (let tag of weapon.tags) {
      tags.push(tag.name);
    };
    weaponsList.push(
      <tr>
        <td>{weapon.name}</td>
        <td>{weapon.harm}</td>
        <td><p>{tags}</p></td>
      </tr>
    );
  };

  const weaponsData = (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Harm</th>
          <th>Tags</th>
        </tr>
      </thead>
      <tbody>
        {weaponsList}
      </tbody>
    </table>
  );

  return (
  <Wrapper>
    <Row label={props.label} data={weaponsData} />
  </Wrapper>
  );
};


// SHARED STYLES

const Wrapper = styled.div`
  display: flex;
`;

export default CharacterSheet;
