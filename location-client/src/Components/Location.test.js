//Test file for location component
import React from "react";
import MyLocation from "./Location";
import snapshotRenderer from "react-test-renderer";
import * as LocationServices from "./LocationServices";
import {
  render,
  cleanup,
  fireEvent,
  screen,
  waitFor,
} from "@testing-library/react"; //For inspection renderingimport snapshotRenderer from "react-test-renderer"; //For snapshot renderingimport thunkMiddleware from "redux-thunk";import BreachActions from "./BreachActions";import { mount } from "enzyme"; //For shallow DOM creation and inspection

let initState = {};
const MyLocationTestComponent = () => {
  return <MyLocation />;
};
describe("My Location Test Component", () => {
  beforeEach(() => {
    LocationServices.getLocation = jest.fn(() =>
      Promise.resolve({
        location: {
          latitude: 123,
          longitude: 123,
        },
      })
    );
    initState = {
      inputVal: null,
      geoInfo: null,
      showError: false,
    };
  });
  afterEach(() => {
    cleanup();
  });
  it("renders location component snapshot", () => {
    const renderedSnapshot = snapshotRenderer.create(
      <MyLocationTestComponent />
    );
    expect(renderedSnapshot.toJSON()).toMatchSnapshot();
  });
  it("Displays error when inavlid ip address is entered", () => {
    render(<MyLocationTestComponent />);
    const userInput = screen.getByRole("textbox");
    fireEvent.change(userInput, {
      target: { value: "11111111111" },
    });
    const findButton = screen.getByRole("button");
    fireEvent.click(findButton);
    const errorMessage = screen.getByTestId("invalidError");
    expect(errorMessage).toBeDefined();
  });
  it("Mock service function is called when user clicks find location with valid input", async () => {
    render(<MyLocationTestComponent />);
    const userInput = screen.getByRole("textbox");
    fireEvent.change(userInput, {
      target: { value: "204.120.0.15" },
    });
    const findButton = screen.getByRole("button");
    fireEvent.click(findButton);
    const listNode = await waitFor(() => screen.getByTestId("locationBlock"));
    expect(LocationServices.getLocation).toHaveBeenCalled();
    expect(listNode).toBeDefined();
  });
});
