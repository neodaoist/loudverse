import React, { useState } from "react";
import { Box, Button, FieldSet, Input, MediaPicker } from "degen";
import { useContract, useSigner } from "wagmi";
import CallForFundsFactory from "../../abis/CallForFundsFactory.json";
import { ethers } from "ethers";
import { cffFactoryAddress } from "../../utils";

const NewProjectForm = () => {
  const [formData, setFormData] = useState({
    title: " ",
    description: " ",
    image: " ",
    category: " ",
    genre: " ",
    subgenre: " ",
    timelineInDays: "0",
    minFundingAmount: "0",
    deliverableMedium: " ",
  });

  const [{ data, error, loading }, getSigner] = useSigner();

  const contract = useContract({
    addressOrName: cffFactoryAddress,
    contractInterface: CallForFundsFactory.abi,
    signerOrProvider: data,
  });

  const onClick = () => {
    contract.createCallForFunds(
      formData.title,
      formData.description,
      formData.image,
      formData.category,
      formData.genre,
      formData.subgenre,
      Number(formData.timelineInDays),
      ethers.utils.parseEther(formData.minFundingAmount),
      formData.deliverableMedium,
    );
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Box width="full" justifyContent="center" marginX="16">
      <FieldSet legend="Open new call for funds">
        <Input
          name="title"
          onChange={e => handleChange(e)}
          label="title"
          placeholder="Give your project a compelling title"
        />
        <Input
          name="description"
          onChange={e => handleChange(e)}
          label="description"
          placeholder="Describe your product's vision - Why is it awesome? How will it make a positive contibution to the world?"
        />
        <Box display="flex">
          <Box>
            <select className="select" name="category" id="category-select">
              <option className="select-options" value="">
                Select category
              </option>
              <option className="select-options" value="Music">
                Music
              </option>
              <option className="select-options" value="Photography">
                Photography
              </option>
              <option className="select-options" value="Painting">
                Painting
              </option>
              <option className="select-options" value="Digital Art">
                Digital Art
              </option>
              <option className="select-options" value="Animation">
                Animation
              </option>
              <option className="select-options" value="Film">
                Film
              </option>
              <option className="select-options" value="Sculpture">
                Sculpture
              </option>
              <option className="select-options" value="Poetry">
                Poetry
              </option>
              <option className="select-options" value="Play">
                Play
              </option>
              <option className="select-options" value="Dance">
                Dance
              </option>
            </select>
          </Box>
          <Box marginLeft="8">
            <select className="select" name="genre" id="genre-select">
              <option className="select-options" value="">
                Select genre
              </option>
              <option className="select-options" value="Ambient">
                Ambient
              </option>
              <option className="select-options" value="Blues">
                Blues
              </option>
              <option className="select-options" value="Country">
                Country
              </option>
              <option className="select-options" value="Classical">
                Classical
              </option>
              <option className="select-options" value="EDM">
                EDM
              </option>
              <option className="select-options" value="Latin">
                Latin
              </option>
              <option className="select-options" value="Hip Hop">
                Hip Hop
              </option>
              <option className="select-options" value="Jazz">
                Jazz
              </option>
              <option className="select-options" value="Rock">
                Rock
              </option>
              <option className="select-options" value="World">
                World
              </option>
            </select>
          </Box>
          <Box marginLeft="8">
            <select className="select" name="subgenre" id="subgenre-select">
              <option className="select-options" value="">
                Select subgenre
              </option>
              <option className="select-options" value="Flute Sonata">
                Flute Sonata
              </option>
              <option className="select-options" value="Orchestral">
                Orchestral
              </option>
              <option className="select-options" value="Piano Sonata">
                Piano Sonata
              </option>
              <option className="select-options" value="String Quartet">
                String Quartet
              </option>
              <option className="select-options" value="Violin Sonata">
                Violin Sonata
              </option>
            </select>
          </Box>
        </Box>
        <Input
          name="minFundingAmount"
          label="Minimum funding goal"
          placeholder="What is the minimum amount of ETH you need"
        />
        <Input
          name="deliverableMedium"
          label="Deliverable"
          placeholder="Describe your final deliverable, e.g., MP3, JPG, PDF, etc. (could be multiple!) "
        />
        <Input
          name="timelineInDays"
          label="Timeline in days"
          placeholder="How many days to deliver your project once it's funded"
        />
        <MediaPicker label="Cover image" compact />
        <Button disabled={!data} onClick={() => onClick()}>
          Open call for funds
        </Button>
      </FieldSet>
    </Box>
  );
};

export default NewProjectForm;
