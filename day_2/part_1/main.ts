function main() {
  const input = Deno.readTextFileSync("./input").trim();
  const lines = input.split("\n");

  const games = lines.map((l) => {
    const [game_id] = l.split(":");
    const game = l.split(":").splice(1).join().trim();

    const too_big = [false, false, false];

    game.split(";").forEach((set) => {
      set = set.trim();

      const big_in_set = [false, false, false];

      set.split(",").forEach((hand) => {
        hand = hand.trim();

        const [string_score, unknown_color] = hand.split(" ");
        const score = Number(string_score);
        const color = unknown_color as "red" | "green" | "blue";

        if (color == "red" && score > 12) {
          big_in_set[0] ||= true;
        } else if (color == "green" && score > 13) {
          big_in_set[1] ||= true;
        } else if (color == "blue" && score > 14) {
          big_in_set[2] ||= true;
        }
      });

      big_in_set.forEach((c, i) => {
        too_big[i] ||= c;
      });
    });

    return [game_id, too_big] as [string, [boolean, boolean, boolean]];
  });

  const won_games = games.map(
    ([game_id_str, too_big]) => {
      const [red, green, blue] = too_big;
      if (red || green || blue) {
        return 0;
      } else {
        const game_id = Number(game_id_str.split(" ").at(-1));
        return game_id;
      }
    },
  ).reduce((acc, v) => acc + v);

  console.log(won_games);
}

main();
