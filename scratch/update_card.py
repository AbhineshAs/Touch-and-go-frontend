with open(r'k:\claude\Touch-and-go-frontend\components\ui\Card.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace(
    'hover:border-primary/40 hover:-translate-y-0.75 hover:shadow-[0_12px_28px_-6px_rgba(22,107,92,0.1),0_4px_10px_-2px_rgba(15,23,42,0.04)] cursor-pointer',
    'hover:border-[#769FCD] hover:-translate-y-0.75 hover:shadow-[0_12px_28px_-6px_rgba(118,159,205,0.15),0_4px_10px_-2px_rgba(20,20,19,0.04)] cursor-pointer'
)

text = text.replace(
    'hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-200',
    'hover:border-[#769FCD] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-4px_rgba(118,159,205,0.12)] transition-all duration-200'
)

with open(r'k:\claude\Touch-and-go-frontend\components\ui\Card.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("Card.tsx updated successfully")

