import React from "react";
import { Box, Button, FieldSet, Input, MediaPicker } from "degen";

const NewProjectForm = () => {
  return (
    <Box width="full">
      <FieldSet legend="Post call for funds">
        <Input label="Title" placeholder="Give your project a compelling title" />
        <Input
          label="Description"
          placeholder="Describe your product's vision - Why is it awesome? How will it make a positive contibution to the world?"
        />
        <Box display="flex">
          <select name="category" id="category-select">
            <option value="">Select</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
          <select name="genre" id="genre-select">
            <option value="">Select</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
          <select name="subgenre" id="subgenre-select">
            <option value="">Select</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
        </Box>
        <Input label="Minimum funding goal" placeholder="How much is the minimum funding you need" />
        <Input
          label="Deliverable"
          placeholder="Describe your final deliverable, e.g., MP3, JPG, PDF, etc. (could be multiple!) "
        />
        <Input label="Timeline in days" placeholder="How many days to deliver your project once it's funded" />
        <MediaPicker label="Cover image" compact />
        <Button>Open call for funds</Button>
      </FieldSet>
    </Box>
  );
};

export default NewProjectForm;
