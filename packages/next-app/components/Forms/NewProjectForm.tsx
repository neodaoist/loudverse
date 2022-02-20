import React, { useState } from "react";
import { Box, Button, FieldSet, Input, MediaPicker, Text } from "degen";
import { useContract, useContractWrite, useSigner } from "wagmi";
import CallForFundsFactory from "../../abis/CallForFundsFactory.json";
import { ethers } from "ethers";
import { cffFactoryAddress, uploadFile } from "../../utils";
import { useRouter } from "next/router";

const initializeFactoryWSigner = signer => {
  return new ethers.Contract(cffFactoryAddress, CallForFundsFactory.abi, signer);
};

const NewProjectForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: " ",
    description: " ",
    // image: " ",
    image: "https://infura-ipfs.io/ipfs/bafkreibjucapj6v6z5droqxq5vujxi472g5mhiyge2i265nd42u62r7mpm",
    category: " ",
    genre: " ",
    subgenre: " ",
    timelineInDays: "0",
    minFundingAmount: "0",
    deliverableMedium: " ",
    file: null,
  });

  const [{ data }, getSigner] = useSigner();

  const onClick = async () => {
    const factoryWrite = initializeFactoryWSigner(await getSigner());
    const tx = await factoryWrite.createCallForFunds(
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

    const receipt = await tx.wait();
    if (receipt) {
      console.log(receipt);
      router.push(`/calls/${receipt.events[0].args[0]}`);
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const handleFile = async (file: File) => {
    // const url = await uploadFile({ file: file, title: formData?.title, desc: formData.description });
    // console.log(url);
    // setFormData(prevState => ({
    //   ...prevState,
    //   image: url,
    // }));
    // console.log(url);
  };

  return (
    <Box width="3/4" justifyContent="center" marginX="16">
      <FieldSet legend="Open new call for funds">
        <Input
          name="title"
          onChange={e => handleChange(e)}
          label="Title"
          placeholder="Give your project a compelling title"
        />
        <Input
          name="description"
          onChange={e => handleChange(e)}
          label="Description"
          placeholder="Describe your product's vision - Why is it awesome? How will it make a positive contibution to the world?"
        />
        <Box marginLeft="4">
          <Text weight="semiBold">Select categories</Text>
        </Box>
        <Box display="flex">
          <Box>
            <select className="select" name="category" id="category-select" onChange={e => handleSelect(e)}>
              <option className="select-options" value="">
                Category
              </option>
              <option name="category" onChange={e => handleChange(e)} className="select-options" value="Music">
                Music
              </option>
              <option name="category" onChange={e => handleChange(e)} className="select-options" value="Photography">
                Photography
              </option>
              <option name="category" onChange={e => handleChange(e)} className="select-options" value="Painting">
                Painting
              </option>
              <option name="category" onChange={e => handleChange(e)} className="select-options" value="Digital Art">
                Digital Art
              </option>
              <option name="category" onChange={e => handleChange(e)} className="select-options" value="Animation">
                Animation
              </option>
              <option name="category" onChange={e => handleChange(e)} className="select-options" value="Film">
                Film
              </option>
              <option name="category" onChange={e => handleChange(e)} className="select-options" value="Sculpture">
                Sculpture
              </option>
              <option name="category" onChange={e => handleChange(e)} className="select-options" value="Poetry">
                Poetry
              </option>
              <option name="category" onChange={e => handleChange(e)} className="select-options" value="Play">
                Play
              </option>
              <option name="category" onChange={e => handleChange(e)} className="select-options" value="Dance">
                Dance
              </option>
            </select>
          </Box>
          <Box marginLeft="8">
            <select className="select" name="genre" id="genre-select" onChange={e => handleSelect(e)}>
              <option className="select-options" value="">
                Genre
              </option>
              <option name="genre" onChange={e => handleChange(e)} className="select-options" value="Ambient">
                Ambient
              </option>
              <option name="genre" onChange={e => handleChange(e)} className="select-options" value="Blues">
                Blues
              </option>
              <option name="genre" onChange={e => handleChange(e)} className="select-options" value="Country">
                Country
              </option>
              <option name="genre" onChange={e => handleChange(e)} className="select-options" value="Classical">
                Classical
              </option>
              <option name="genre" onChange={e => handleChange(e)} className="select-options" value="EDM">
                EDM
              </option>
              <option name="genre" onChange={e => handleChange(e)} className="select-options" value="Latin">
                Latin
              </option>
              <option name="genre" onChange={e => handleChange(e)} className="select-options" value="Hip Hop">
                Hip Hop
              </option>
              <option name="genre" onChange={e => handleChange(e)} className="select-options" value="Jazz">
                Jazz
              </option>
              <option name="genre" onChange={e => handleChange(e)} className="select-options" value="Rock">
                Rock
              </option>
              <option name="genre" onChange={e => handleChange(e)} className="select-options" value="World">
                World
              </option>
            </select>
          </Box>
          <Box marginLeft="8">
            <select className="select" name="subgenre" id="subgenre-select" onChange={e => handleSelect(e)}>
              <option className="select-options" value="">
                Subgenre
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
          onChange={e => handleChange(e)}
          name="minFundingAmount"
          label="Minimum funding goal"
          placeholder="What is the minimum amount of ETH you need"
        />
        <Input
          onChange={e => handleChange(e)}
          name="deliverableMedium"
          label="Deliverable"
          placeholder="Describe your final deliverable, e.g., MP3, JPG, PDF, etc. (could be multiple!) "
        />
        <Input
          onChange={e => handleChange(e)}
          name="timelineInDays"
          label="Timeline in days"
          placeholder="How many days to deliver your project once it's funded"
        />
        <MediaPicker label="Cover image" compact onChange={file => handleFile(file)} />
        <Button onClick={() => onClick()}>Open call for funds</Button>
      </FieldSet>
    </Box>
  );
};

export default NewProjectForm;
