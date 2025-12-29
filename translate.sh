#!/usr/bin/env bash

# 4License Translation Script using lingo.dev
# This script translates the LICENSE.en-US file into various languages

set -euo pipefail

SCRIPT_NAME=$(basename "$0")
SOURCE_FILE="LICENSE.en-US"
LINGO_API_URL="https://api.lingo.dev/v1/translate"

# Define all supported languages with their ISO codes and names
declare -A LANGUAGES=(
    # Major Indian Constitutional Languages (Schedule VIII)
    ["as"]="Assamese"
    ["bn"]="Bengali"
    ["gu"]="Gujarati"
    ["hi"]="Hindi"
    ["kn"]="Kannada"
    ["ks"]="Kashmiri"
    ["kok"]="Konkani"
    ["ml"]="Malayalam"
    ["mni"]="Manipuri"
    ["mr"]="Marathi"
    ["ne"]="Nepali"
    ["or"]="Odia"
    ["pa"]="Punjabi"
    ["sa"]="Sanskrit"
    ["sd"]="Sindhi"
    ["ta"]="Tamil"
    ["te"]="Telugu"
    ["ur"]="Urdu"
    ["brx"]="Bodo"
    ["sat"]="Santhali"
    ["mai"]="Maithili"
    ["doi"]="Dogri"
    
    # Recommended International Languages
    ["es"]="Spanish"
    ["fr"]="French"
    ["de"]="German"
    ["zh-CN"]="Chinese (Simplified)"
    ["zh-TW"]="Chinese (Traditional)"
    ["ja"]="Japanese"
    ["ko"]="Korean"
    ["ar"]="Arabic"
    ["ru"]="Russian"
    ["pt"]="Portuguese"
    ["it"]="Italian"
    ["nl"]="Dutch"
    ["tr"]="Turkish"
    ["vi"]="Vietnamese"
    ["th"]="Thai"
    ["id"]="Indonesian"
    ["pl"]="Polish"
    ["sv"]="Swedish"
)

# Function to display help message
show_help() {
    cat << EOF
4License Translation Script
===========================

This script translates the LICENSE.en-US file into various languages using lingo.dev API.

USAGE:
    $SCRIPT_NAME help                      - Show this help message
    $SCRIPT_NAME translate [LANG_CODE]     - Translate to specified language (outputs to stdout)
    $SCRIPT_NAME translate [LANG_CODE] > [OUTPUT_FILE]  - Translate and save to file

SUPPORTED LANGUAGES:

Indian Constitutional Languages (Schedule VIII):
-------------------------------------------------
    1.  as      - Assamese
    2.  bn      - Bengali
    3.  gu      - Gujarati
    4.  hi      - Hindi
    5.  kn      - Kannada
    6.  ks      - Kashmiri
    7.  kok     - Konkani
    8.  ml      - Malayalam
    9.  mni     - Manipuri
    10. mr      - Marathi
    11. ne      - Nepali
    12. or      - Odia
    13. pa      - Punjabi
    14. sa      - Sanskrit
    15. sd      - Sindhi
    16. ta      - Tamil
    17. te      - Telugu
    18. ur      - Urdu
    19. brx     - Bodo
    20. sat     - Santhali
    21. mai     - Maithili
    22. doi     - Dogri

International Languages:
------------------------
    23. es      - Spanish
    24. fr      - French
    25. de      - German
    26. zh-CN   - Chinese (Simplified)
    27. zh-TW   - Chinese (Traditional)
    28. ja      - Japanese
    29. ko      - Korean
    30. ar      - Arabic
    31. ru      - Russian
    32. pt      - Portuguese
    33. it      - Italian
    34. nl      - Dutch
    35. tr      - Turkish
    36. vi      - Vietnamese
    37. th      - Thai
    38. id      - Indonesian
    39. pl      - Polish
    40. sv      - Swedish

EXAMPLES:
    $SCRIPT_NAME help
    $SCRIPT_NAME translate hi > LICENSE.hi
    $SCRIPT_NAME translate fr > LICENSE.fr
    $SCRIPT_NAME translate zh-CN > LICENSE.zh-CN

ENVIRONMENT VARIABLES:
    LINGO_API_KEY   - API key for lingo.dev (required for translation)

NOTE:
    You need to set the LINGO_API_KEY environment variable to use the translation feature.
    Visit https://lingo.dev to obtain an API key.

EOF
}

# Function to check if a language code is supported
is_language_supported() {
    local lang_code="$1"
    [[ -v LANGUAGES[$lang_code] ]]
}

# Function to translate text using lingo.dev API
translate_with_lingo() {
    local target_lang="$1"
    local source_text="$2"
    
    if [[ -z "${LINGO_API_KEY:-}" ]]; then
        echo "Error: LINGO_API_KEY environment variable is not set." >&2
        echo "Please set it with: export LINGO_API_KEY='your-api-key'" >&2
        echo "Visit https://lingo.dev to obtain an API key." >&2
        echo "" >&2
        echo "ALTERNATIVE USAGE:" >&2
        echo "If lingo.dev is not available, you can modify this script to use:" >&2
        echo "  - Google Translate API" >&2
        echo "  - DeepL API" >&2
        echo "  - LibreTranslate (self-hosted)" >&2
        echo "  - Any other translation service" >&2
        exit 1
    fi
    
    # Check if required tools are available
    if ! command -v curl &> /dev/null; then
        echo "Error: curl is required but not installed." >&2
        exit 1
    fi
    
    if ! command -v jq &> /dev/null; then
        echo "Error: jq is required but not installed." >&2
        exit 1
    fi
    
    # Prepare JSON payload
    local json_payload
    json_payload=$(jq -n \
        --arg src "en-US" \
        --arg tgt "$target_lang" \
        --arg txt "$source_text" \
        '{source_language: $src, target_language: $tgt, text: $txt}')
    
    # Call lingo.dev API
    # The API endpoint and format may need to be adjusted based on actual lingo.dev specifications
    local response
    response=$(curl -s -X POST "$LINGO_API_URL" \
        -H "Authorization: Bearer $LINGO_API_KEY" \
        -H "Content-Type: application/json" \
        -d "$json_payload" 2>&1)
    
    local curl_exit_code=$?
    
    # Check if curl succeeded
    if [[ $curl_exit_code -ne 0 ]]; then
        echo "Error: Failed to connect to translation service." >&2
        echo "Details: $response" >&2
        echo "" >&2
        echo "NOTE: This script requires a valid lingo.dev API key and internet connection." >&2
        echo "Verify that:" >&2
        echo "  1. Your LINGO_API_KEY is correct" >&2
        echo "  2. You have internet connectivity" >&2
        echo "  3. The lingo.dev service is accessible" >&2
        exit 1
    fi
    
    # Parse and return the translated text
    # This assumes the API returns JSON with a "translated_text" or "translation" field
    local translated_text
    translated_text=$(echo "$response" | jq -r '.translated_text // .translation // empty')
    
    # If jq fails or returns empty, show error
    if [[ -z "$translated_text" ]]; then
        echo "Error: Failed to parse translation response." >&2
        echo "API Response: $response" >&2
        echo "" >&2
        echo "This could mean:" >&2
        echo "  1. The API returned an error" >&2
        echo "  2. The response format is different than expected" >&2
        echo "  3. The language code '$target_lang' is not supported by lingo.dev" >&2
        exit 1
    fi
    
    echo "$translated_text"
}

# Function to translate the license file
translate_license() {
    local target_lang="$1"
    
    if [[ ! -f "$SOURCE_FILE" ]]; then
        echo "Error: Source file '$SOURCE_FILE' not found." >&2
        exit 1
    fi
    
    if ! is_language_supported "$target_lang"; then
        echo "Error: Language code '$target_lang' is not supported." >&2
        echo "Run '$SCRIPT_NAME help' to see the list of supported languages." >&2
        exit 1
    fi
    
    echo "# Translating LICENSE to ${LANGUAGES[$target_lang]} ($target_lang)..." >&2
    echo "# Source: $SOURCE_FILE" >&2
    echo "# This may take a few moments..." >&2
    echo "" >&2
    
    # Read the source file
    local source_content
    source_content=$(cat "$SOURCE_FILE")
    
    # Translate the content
    translate_with_lingo "$target_lang" "$source_content"
}

# Main script logic
main() {
    if [[ $# -eq 0 ]]; then
        show_help
        exit 0
    fi
    
    case "$1" in
        help|--help|-h)
            show_help
            ;;
        translate)
            if [[ $# -lt 2 ]]; then
                echo "Error: Language code required for translate command." >&2
                echo "Usage: $SCRIPT_NAME translate [LANG_CODE]" >&2
                exit 1
            fi
            translate_license "$2"
            ;;
        *)
            echo "Error: Unknown command '$1'" >&2
            echo "Run '$SCRIPT_NAME help' for usage information." >&2
            exit 1
            ;;
    esac
}

main "$@"
