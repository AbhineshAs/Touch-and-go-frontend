with open(r'k:\claude\Touch-and-go-frontend\app\candidate\page.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines: {len(lines)}")

# Let's find line 260 and 577
start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if '{/* Top Banner & Profile Overview */}' in line:
        start_idx = i
    if '{/* 2. PROFILE & EXPERIENCE TAB */}' in line:
        end_idx = i
        break

print(f"Start index: {start_idx}, End index: {end_idx}")

