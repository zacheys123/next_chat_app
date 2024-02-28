import { Label, Select } from "flowbite-react";
import React from "react";

const StartForm = () => {
  return (
    <form>
      <h1 className="text-xl font-bold text-center mb-2 text-white">
        Additional Information
      </h1>
      <div className="flex flex-col gap-3 py-6 px-3">
        <input type="text" name="fullname" placeholder="Firstname" />
        <input type="text" name="fullname" placeholder="secondName" />
        <input type="text" name="fullname" placeholder="Instrument of choice" />
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Select your country" />
          </div>
          <Select id="countries" required>
            <option>United States</option>
            <option>Canada</option>
            <option>France</option>
            <option>Germany</option>
          </Select>
        </div>
        <input type="text" name="fullname" placeholder />
        <input type="text" name="fullname" placeholder />
        <input type="text" name="fullname" placeholder />
        <input type="text" name="fullname" placeholder />
        <input type="text" name="fullname" placeholder />
      </div>
    </form>
  );
};

export default StartForm;
