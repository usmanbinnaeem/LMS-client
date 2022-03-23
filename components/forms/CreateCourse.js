import { useState, useEffect } from "react";
import Button from "@mui/material/Button";

const CreateCourse = ({
  handleSubmit,
  handleImage,
  handleChange,
  values,
  setValues,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Course Name"
          value={values.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <textarea
          name="description"
          placeholder="Enter Description about course"
          cols="45"
          rows="7"
          value={values.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <div>
          <div>
            <select
              style={{ width: "100%" }}
              size="large"
              value={values.paid}
              onChange={(e) => setValues({ ...values, paid: !values.paid })}
            >
              <option value={true}>Paid</option>
              <option value={false}>Free</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <div>
          <div>
            <label>
              {values.loading ? "Uploading" : "Image Upload"}
              <input
                type="file"
                name="image"
                onChange={handleImage}
                accept="image/*"
                hidden
              />
            </label>
          </div>
        </div>
      </div>

      <div>
        <div>
          <Button
            fullWidth
            type="submit"
            variant="outlined"
            color="primary"
            sx={{ width: 350 }}
            onClick={handleSubmit}
            disabled={values.loading || values.uploading}
            loading={values.loading}
          >
            {values.loading ? "Saving..." : "Save & Continue"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreateCourse;
