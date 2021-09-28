import {
  acceptance,
  count,
  exists,
  updateCurrentUser,
} from "discourse/tests/helpers/qunit-helpers";
import { test } from "qunit";
import { visit } from "@ember/test-helpers";

acceptance("Managing Group Profile", function () {
  test("As an anonymous user", async function (assert) {
    await visit("/g/discourse/manage/profile");

    assert.ok(
      exists(".group-members tr"),
      "it should redirect to members page for an anonymous user"
    );
  });
});

acceptance("Managing Group Profile", function (needs) {
  needs.user();

  test("As an admin", async function (assert) {
    await visit("/g/discourse/manage/profile");

    assert.equal(
      count(".group-form-bio"),
      1,
      "it should display group bio input"
    );
    assert.equal(
      count(".group-form-name"),
      1,
      "it should display group name input"
    );
    assert.equal(
      count(".group-form-full-name"),
      1,
      "it should display group full name input"
    );
  });

  test("As a group owner", async function (assert) {
    updateCurrentUser({
      moderator: false,
      admin: false,
      can_create_group: false,
    });

    await visit("/g/discourse/manage/profile");

    assert.ok(
      !exists(".group-form-name"),
      "it should not display group name input"
    );
  });
});
