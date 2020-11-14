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
  "moves": 0
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

// SHARED STYLES

const Wrapper = styled.div`
  display: flex;
`;

export default CharacterSheet;
