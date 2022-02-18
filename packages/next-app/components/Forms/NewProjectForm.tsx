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
      <FieldSet legend="Create New Call For Funds">
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
          <select className="select" name="category" id="category-select">
            <option className="select-options" value="">
              Select
            </option>
            <option className="select-options" value="dog">
              Dog
            </option>
            <option className="select-options" value="cat">
              Cat
            </option>
          </select>
          <select className="select" name="genre" id="genre-select">
            <option className="select-options" value="">
              Select
            </option>
            <option className="select-options" value="dog">
              Dog
            </option>
            <option className="select-options" value="cat">
              Cat
            </option>
          </select>
          <select className="select" name="subgenre" id="subgenre-select">
            <option className="select-options" value="">
              Select
            </option>
            <option className="select-options" value="dog">
              Dog
            </option>
            <option className="select-options" value="cat">
              Cat
            </option>
          </select>
        </Box>
        <Input
          name="minFundingAmount"
          label="Minimum funding goal"
          placeholder="How much is the minimum funding you need"
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
