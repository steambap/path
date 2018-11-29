import { test, assertEqual } from "https://deno.land/x/testing/testing.ts";
import path from "../index";

const failures = [];
const backslashRE = /\\/g;

test(function joinTest() {
  assertEqual(failures.length, 0, failures.join(""));
});
