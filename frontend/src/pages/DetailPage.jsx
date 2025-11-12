import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useCreatePost } from "../components/hooks/useCreatePost";

const DetailPage = (e) => {
  const { formData, handleChange, handleSubmit, error, isLoading, success } =
    useCreatePost();

  return (
    <>
      <div className="h-screen bg-neutral-200 px-4 py-8">
        <Link to="/">
          <button className="btn shadow-none border-0 bg-pink-700 text-white">
            Go back
          </button>
        </Link>
        <form
          className="flex flex-col **:border-2  gap-4 pt-10   **:p-4 **:text-black"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Put your rental name"
            name="rentTitle"
            value={formData.rentTitle}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Put your rental description"
            name="rentDescription"
            value={formData.rentDescription}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Choose what rental"
            name="rentCategory"
            value={formData.rentCategory}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Put your rental address"
            name="rentAddress"
            value={formData.rentAddress}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Put your rental price"
            name="rentPrice"
            value={formData.rentPrice}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Put the rental URL here"
            name="rentImageURL"
            value={formData.rentImageURL}
            onChange={handleChange}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Creating" : "Create a new list"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && (
            <p style={{ color: "green" }}>Post created successfully!</p>
          )}
        </form>
      </div>

      <div></div>
    </>
  );
};

export default DetailPage;
