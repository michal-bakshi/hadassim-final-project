import os
from collections import Counter

#O(L)--L lines in file
def split_file_into_pages(file_path, page_size=100000):
    os.makedirs("output_pages", exist_ok=True)
    with open(file_path, 'r') as file:
        lines = file.readlines()

    total_pages = len(lines) // page_size + (1 if len(lines) % page_size > 0 else 0)

    pages = [lines[i * page_size: (i + 1) * page_size] for i in range(total_pages)]

    page_files = []
    for i, page in enumerate(pages):
        page_filename = os.path.join("output_pages", f"page_{i + 1}.txt")
        with open(page_filename, 'w') as page_file:
            page_file.writelines(page)
        page_files.append(page_filename)

    return page_files

# O(k)--- k lines in page
def count_error_codes(chunk):
    error_codes = [line.split("Error: ")[-1].strip() for line in chunk]
    return Counter(error_codes)

#O(m * k) m num of files , k lines in file
def find_top_n_error_codes(file_paths, n):
    total_counts = Counter()

    for file_path in file_paths:
        with open(file_path, 'r') as file:
            chunk = file.readlines()
            total_counts.update(count_error_codes(chunk))

    return total_counts.most_common(n)


def main():
    file_path = input("Enter the log file path: ")
    n = int(input("Enter the number of most common error codes to find: "))

    page_files = split_file_into_pages(file_path, page_size=100000)

    top_error_codes = find_top_n_error_codes(page_files, n)
    print(top_error_codes)

#O(L + m * k)
if __name__ == "__main__":
    main()
