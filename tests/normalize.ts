import { test, assertEqual } from "https://deno.land/x/testing/testing.ts";
import path from "../index";

test(function win32Normalize() {
  assertEqual(
    path.win32.normalize("./fixtures///b/../b/c.js"),
    "fixtures\\b\\c.js"
  );
  assertEqual(path.win32.normalize("/foo/../../../bar"), "\\bar");
  assertEqual(path.win32.normalize("a//b//../b"), "a\\b");
  assertEqual(path.win32.normalize("a//b//./c"), "a\\b\\c");
  assertEqual(path.win32.normalize("a//b//."), "a\\b");
  assertEqual(
    path.win32.normalize("//server/share/dir/file.ext"),
    "\\\\server\\share\\dir\\file.ext"
  );
  assertEqual(path.win32.normalize("/a/b/c/../../../x/y/z"), "\\x\\y\\z");
  assertEqual(path.win32.normalize("C:"), "C:.");
  assertEqual(path.win32.normalize("C:..\\abc"), "C:..\\abc");
  assertEqual(path.win32.normalize("C:..\\..\\abc\\..\\def"), "C:..\\..\\def");
  assertEqual(path.win32.normalize("C:\\."), "C:\\");
  assertEqual(path.win32.normalize("file:stream"), "file:stream");
  assertEqual(path.win32.normalize("bar\\foo..\\..\\"), "bar\\");
  assertEqual(path.win32.normalize("bar\\foo..\\.."), "bar");
  assertEqual(path.win32.normalize("bar\\foo..\\..\\baz"), "bar\\baz");
  assertEqual(path.win32.normalize("bar\\foo..\\"), "bar\\foo..\\");
  assertEqual(path.win32.normalize("bar\\foo.."), "bar\\foo..");
  assertEqual(path.win32.normalize("..\\foo..\\..\\..\\bar"), "..\\..\\bar");
  assertEqual(
    path.win32.normalize("..\\...\\..\\.\\...\\..\\..\\bar"),
    "..\\..\\bar"
  );
  assertEqual(
    path.win32.normalize("../../../foo/../../../bar"),
    "..\\..\\..\\..\\..\\bar"
  );
  assertEqual(
    path.win32.normalize("../../../foo/../../../bar/../../"),
    "..\\..\\..\\..\\..\\..\\"
  );
  assertEqual(
    path.win32.normalize("../foobar/barfoo/foo/../../../bar/../../"),
    "..\\..\\"
  );
  assertEqual(
    path.win32.normalize("../.../../foobar/../../../bar/../../baz"),
    "..\\..\\..\\..\\baz"
  );
  assertEqual(path.win32.normalize("foo/bar\\baz"), "foo\\bar\\baz");
});

test(function posixNormalize() {
  assertEqual(
    path.posix.normalize("./fixtures///b/../b/c.js"),
    "fixtures/b/c.js"
  );
  assertEqual(path.posix.normalize("/foo/../../../bar"), "/bar");
  assertEqual(path.posix.normalize("a//b//../b"), "a/b");
  assertEqual(path.posix.normalize("a//b//./c"), "a/b/c");
  assertEqual(path.posix.normalize("a//b//."), "a/b");
  assertEqual(path.posix.normalize("/a/b/c/../../../x/y/z"), "/x/y/z");
  assertEqual(path.posix.normalize("///..//./foo/.//bar"), "/foo/bar");
  assertEqual(path.posix.normalize("bar/foo../../"), "bar/");
  assertEqual(path.posix.normalize("bar/foo../.."), "bar");
  assertEqual(path.posix.normalize("bar/foo../../baz"), "bar/baz");
  assertEqual(path.posix.normalize("bar/foo../"), "bar/foo../");
  assertEqual(path.posix.normalize("bar/foo.."), "bar/foo..");
  assertEqual(path.posix.normalize("../foo../../../bar"), "../../bar");
  assertEqual(path.posix.normalize("../.../.././.../../../bar"), "../../bar");
  assertEqual(
    path.posix.normalize("../../../foo/../../../bar"),
    "../../../../../bar"
  );
  assertEqual(
    path.posix.normalize("../../../foo/../../../bar/../../"),
    "../../../../../../"
  );
  assertEqual(
    path.posix.normalize("../foobar/barfoo/foo/../../../bar/../../"),
    "../../"
  );
  assertEqual(
    path.posix.normalize("../.../../foobar/../../../bar/../../baz"),
    "../../../../baz"
  );
  assertEqual(path.posix.normalize("foo/bar\\baz"), "foo/bar\\baz");
});
