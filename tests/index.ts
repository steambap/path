import { test, assertEqual } from "https://deno.land/x/testing/testing.ts";
import path from "../index";

import "./normalize";
import "./basename";
import "./dirname";
import "./extname";
import "./isabsolute";
import "./join";

test(function delimiter() {
  assertEqual(path.win32.delimiter, ";");
  assertEqual(path.posix.delimiter, ":");
});

test(function sep() {
  assertEqual(path.win32.sep, "\\");
  assertEqual(path.posix.sep, "/");
});
