import React, { useState } from "react";
import { Box, Button, FieldSet, Input, MediaPicker, Text } from "degen";
import { useSigner } from "wagmi";
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
    category: " ",
    genre: " ",
    subgenre: " ",
    timelineInDays: "0",
    minFundingAmount: "0",
    deliverableMedium: " ",
    videoUri: " ",
    file: null,
  });
  const [isUploading, setIsUploading] = useState(false);

  const { data: signer } = useSigner();

  const onClick = async () => {
    setIsUploading(true);
    const url = await uploadFile({ file: formData?.file, title: formData?.title, desc: formData?.description });

    try {
      const factoryWrite = initializeFactoryWSigner(signer);
      const tx = await factoryWrite.createCallForFunds(
        formData.title,
        formData.description,
        url,
        formData.category,
        formData.genre,
        formData.subgenre,
        Number(formData.timelineInDays),
        ethers.utils.parseEther(formData.minFundingAmount),
        formData.deliverableMedium,
        formData.videoUri,
      );

      const receipt = await tx.wait();
      if (receipt) {
        setIsUploading(false);
        router.push(`/calls/${receipt.events[0].args[0]}`);
      }
    } catch (error) {
      setIsUploading(false);
      console.log(error);
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
    setFormData(prevState => ({
      ...prevState,
      file: file,
    }));
  };

  return (
    <Box width="3/4" justifyContent="center" marginX="16">
      <FieldSet legend="Open New Call For Funds">
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
            <select className="select" name="genre" id="genre-select" onChange={e => handleSelect(e)}>
              <option className="select-options" value="">
                Genre
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
              <option className="select-options" value="Other">
                Other
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
              <option className="select-options" value="Other">
                Other
              </option>
            </select>
          </Box>
        </Box>
        <Input
          onChange={e => handleChange(e)}
          name="minFundingAmount"
          label="Minimum funding goal"
          placeholder="What is the minimum amount of DAI you need"
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
        <Input onChange={e => handleChange(e)} name="videoUri" label="Project Video" placeholder="Livepeer URL" />
        <Button
          // disabled={isUploading || !signer}
          disabled={true} // cap of 6 round 1
          onClick={() => onClick()}
          loading={isUploading}
        >
          {!signer ? "Please Connect Your Wallet" : "Open call for funds"}
        </Button>
      </FieldSet>
    </Box>
  );
};

export default NewProjectForm;
