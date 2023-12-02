function main() {
  const input = Deno.readTextFileSync("./input").trim();
  const lines = input.split("\n");

  const sum = lines.map((line) => process_line(line))
    .reduce((acc, n) => acc + n);

  console.log("");
  console.log(sum);
}

main();

function process_line(line: string): number {
  const [left_num, right_num] = find_corner_numbers(line);
  debug_line_nums(left_num, right_num, line);

  const l = left_num.n ? left_num.n.toString() : "";
  const r = right_num.n ? right_num.n.toString() : "";

  return Number(`${l}${r}`);
}

type CornerNumber = {
  n: number | null;
  i: number | null;
};
function find_corner_numbers(
  s: string,
): [CornerNumber, CornerNumber] {
  const chars = s.split("");

  const left: CornerNumber = { n: null, i: null };
  const right: CornerNumber = { n: null, i: null };

  let right_pos = s.length - 1;
  let left_pos = 0;

  let right_found = false;
  let left_found = false;
  for (let i = 0; i < s.length; i++) {
    const is_corners_found = left.n && right.n;
    if (is_corners_found) break;

    const traverse_from_left = i % 2 === 0;
    if ((traverse_from_left || right_found) && !left_found) {
      const maybe_num = chars.at(left_pos)! as unknown as number;
      if (!isNaN(maybe_num)) {
        left.n ??= Number(maybe_num);
        left.i ??= left_pos;

        left_found = true;
        continue;
      }
      left_pos++;
    } else if (!right_found) {
      const maybe_num = chars.at(right_pos)! as unknown as number;
      if (!isNaN(maybe_num)) {
        right.n ??= Number(maybe_num);
        right.i ??= right_pos;

        right_found = true;
        continue;
      }
      right_pos--;
    }
  }

  if (left.n && right.n === null) {
    right.n = left.n;
    right.i = left.i;
  } else if (right.n && left.n === null) {
    left.n = right.n;
    left.i = right.i;
  }

  return [left, right];
}

//
// DEBUG STUFF
//

function debug_line_nums(l: CornerNumber, r: CornerNumber, s: string) {
  console.log(l, r);

  if (l.i === r.i) {
    const [left_dbg, left_styles] = color_char_at(l.i!, s);

    console.log(left_dbg, ...left_styles);
  } else {
    const [left_dbg, left_styles] = color_char_at(l.i!, s);
    const [line_dbg, right_styles] = color_char_at(r.i! + 4, left_dbg);

    console.log(line_dbg, ...[...left_styles, ...right_styles]);
  }
}

function color_char_at(i: number, s: string) {
  const left = s.slice(0, i);
  const mid = s.charAt(i);
  const right = s.slice(i + 1);

  const style = ["color: #f00;", "color: unset;"];

  return [`${left}%c${mid}%c${right}`, style] as [string, [string, string]];
}
