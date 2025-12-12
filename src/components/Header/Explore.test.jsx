import React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect, describe } from "vitest";
import Explore from "./Explore";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

describe("test explore component", () => {
  //Test loading state

  test("renders loadng logo when the status is loading", () => {
    const mockLoadingState = (
      state = { category: [], status: "loading", error: null, after: null }
    ) => state;

    const store = configureStore({
      reducer: {
        subReddits: mockLoadingState,
      },
    });

    render(
      <Provider store={store}>
        <Explore />
      </Provider>
    );
    const loadingLogo = screen.getByAltText("Logo");
    expect(loadingLogo).toBeInTheDocument();
  });

  //Test failed state

  test("renders error when the status is failed", () => {
    const mockFailedStatus = (
      state = {
        category: [],
        status: "failed",
        error: "something went wrong",
        after: null,
      }
    ) => state;

    const store = configureStore({
      reducer: {
        subReddits: mockFailedStatus,
      },
    });

    render(
      <Provider store={store}>
        <Explore />
      </Provider>
    );
    expect(screen.getByText("something went wrong")).toBeInTheDocument();
  });

  //Test success state
