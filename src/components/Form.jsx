import React from "react";
import { useForm } from "react-hook-form";

export default function Form(props) {
  const { user, isCreating, onClickHandler } = props;
  const { register, handleSubmit, isDirty, dirtyFields } = useForm();
  const onSubmit = (data) => onClickHandler(data, user);


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row">
        <div className="form-group col">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="email"
            defaultValue={user?.email || ""}
            ref={register}
          />
        </div>
      </div>
      {isCreating && (
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              id="password"
              ref={register}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="password_confirmation">Confirmation</label>
            <input
              name="password_confirmation"
              type="password"
              className="form-control"
              id="password_confirmation"
              ref={register}
            />
          </div>
        </div>
      )}
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="firstname">First Name</label>
          <input
            name="firstname"
            type="text"
            className="form-control"
            id="firstname"
            defaultValue={user?.firstname || ""}
            ref={register}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="lastname">Last Name</label>
          <input
            name="lastname"
            type="text"
            className="form-control"
            id="lastname"
            defaultValue={user?.lastname || ""}
            ref={register}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="mood">Mood</label>
        <input
          name="mood"
          type="text"
          className="form-control"
          id="mood"
          defaultValue={user?.mood || ""}
          ref={register}
        />
      </div>
      <div className="form-group">
        <label htmlFor="birthday">Birthday</label>
        <input
          name="birthday_at"
          type="date"
          className="form-control"
          id="birthday"
          defaultValue={user?.birthday || ""}
          ref={register}
          placeholder={user?.birthday || ""}
        />
      </div>
      <div className="form-row">
        <div className="form-group col">
          <label htmlFor="gender">Gender</label>
          <select
            name="gender"
            id="gender"
            className="form-control"
            ref={register}
          >
            <option>Choose...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col">
          <label htmlFor="about">About</label>
          <textarea
            id="about"
            name="about"
            colSpan="6"
            className="form-control"
            defaultValue={user?.about || ""}
            ref={register}
          />
        </div>
      </div>
      {onClickHandler !== null && (
        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={isDirty}
        >
          Send
        </button>
      )}
    </form>
  );
}
