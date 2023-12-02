function main() {
  const input = Deno.readTextFileSync("./input").trim();
  const lines = input.split("\n");

  const games = lines.map((l) => {
    const [game_id] = l.split(":");
    const game = l.split(":").splice(1).join().trim();

    const too_big = game.split(";").map((set) => {
      set = set.trim();

      const big_in_set = [1, 1, 1];

      set.split(",").forEach((hand) => {
        hand = hand.trim();

        const [string_score, unknown_color] = hand.split(" ");
        const score = Number(string_score);
        const color = unknown_color as "red" | "green" | "blue";

        if (color == "red") {
          big_in_set[0] = score > big_in_set[0] ? score : big_in_set[0];
        } else if (color == "green") {
          big_in_set[1] = score > big_in_set[1] ? score : big_in_set[1];
        } else if (color == "blue") {
          big_in_set[2] = score > big_in_set[2] ? score : big_in_set[2];
        }
      });

      return big_in_set;
    }).reduce((acc, curr) => {
      const bigger_replaces_smaller = [];
      bigger_replaces_smaller[0] = curr[0] > acc[0] ? curr[0] : acc[0];
      bigger_replaces_smaller[1] = curr[1] > acc[1] ? curr[1] : acc[1];
      bigger_replaces_smaller[2] = curr[2] > acc[2] ? curr[2] : acc[2];
      return bigger_replaces_smaller;
    });

    return [game_id, too_big] as [string, [number, number, number]];
  });

  const won_games = games.map(
    ([_, [red, green, blue]]) => red * green * blue,
  ).reduce((acc, v) => acc + v);

  console.log(won_games);
}

main();
