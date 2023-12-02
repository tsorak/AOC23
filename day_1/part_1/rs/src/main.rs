#![feature(exclusive_range_pattern)]

use std::fs;

fn main() {
    let file_contents = fs::read_to_string("./input").unwrap();
    let input = file_contents.split("\n").collect::<Vec<&str>>();

    let first_and_last_number_per_line_sum: i32 = input
        .into_iter()
        .map(|line| {
            let line_nums: Vec<String> = nums_from_string(line.to_string())
                .chars()
                .map(|s| s.to_string())
                .collect();

            let first = line_nums.first();
            let first = match first {
                Some(v) => v.to_owned().to_owned(),
                _ => "0".to_owned(),
            };

            let last = line_nums.last();
            let last = match last {
                Some(v) => v.to_owned().to_owned(),
                _ => "0".to_owned(),
            };

            format!("{}{}", first, last).parse::<i32>().unwrap_or(0)
        })
        .reduce(|acc, n| acc + n)
        .unwrap_or(0);

    println!("{}", first_and_last_number_per_line_sum);
}

fn nums_from_string(s: String) -> String {
    let only_numbers = s
        .chars()
        .map(|c| {
            let i = c as u8;
            match i {
                48..58 => (i as char).to_string(),
                _ => "".to_owned(),
            }
        })
        .collect();
    only_numbers
}
