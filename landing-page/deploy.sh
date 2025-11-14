#!/bin/bash

###############################################################################
# Deployment Script for IBM Landing Page
# Prepares files for upload to shared hosting
###############################################################################

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;36m'
NC='\033[0m' # No Color
BOLD='\033[1m'

# Configuration
DEPLOY_DIR="deploy"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
ARCHIVE_NAME="ibm-landing-page-${TIMESTAMP}.zip"

###############################################################################
# Functions
###############################################################################

print_header() {
    echo -e "${BLUE}${BOLD}"
    echo "═══════════════════════════════════════════════════════"
    echo "  IBM Landing Page - Deployment Preparation"
    echo "═══════════════════════════════════════════════════════"
    echo -e "${NC}"
}

print_step() {
    echo -e "${BLUE}▶ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

###############################################################################
# Pre-flight Checks
###############################################################################

check_requirements() {
    print_step "Checking requirements..."

    # Check if npm is installed
    if ! command -v npm &> /dev/null; then
        print_error "npm not found. Please install Node.js and npm first."
        exit 1
    fi

    # Check if node_modules exists
    if [ ! -d "node_modules" ]; then
        print_warning "node_modules not found. Running npm install..."
        npm install
    fi

    print_success "All requirements satisfied"
}

###############################################################################
# Build Process
###############################################################################

run_build() {
    print_step "Building minified assets..."

    # Run build script
    npm run build

    if [ $? -eq 0 ]; then
        print_success "Build completed successfully"
    else
        print_error "Build failed. Please fix errors and try again."
        exit 1
    fi
}

###############################################################################
# Prepare Deployment Files
###############################################################################

prepare_files() {
    print_step "Preparing deployment files..."

    # Remove old deploy directory if exists
    if [ -d "$DEPLOY_DIR" ]; then
        rm -rf "$DEPLOY_DIR"
        print_warning "Removed old deployment directory"
    fi

    # Create deploy directory
    mkdir -p "$DEPLOY_DIR"

    # Copy files and directories
    print_step "Copying files..."

    # HTML
    cp index.html "$DEPLOY_DIR/"

    # CSS
    mkdir -p "$DEPLOY_DIR/css"
    cp css/styles.min.css "$DEPLOY_DIR/css/"
    cp css/styles.css "$DEPLOY_DIR/css/" # Keep original for debugging

    # JavaScript
    mkdir -p "$DEPLOY_DIR/js"
    cp js/main.min.js "$DEPLOY_DIR/js/"
    cp js/gsap-animations.min.js "$DEPLOY_DIR/js/"
    cp js/form.min.js "$DEPLOY_DIR/js/"
    cp js/main.js "$DEPLOY_DIR/js/" # Keep originals for debugging
    cp js/gsap-animations.js "$DEPLOY_DIR/js/"
    cp js/form.js "$DEPLOY_DIR/js/"

    # Images
    if [ -d "images" ]; then
        cp -r images "$DEPLOY_DIR/"
    fi

    # Fonts
    if [ -d "fonts" ]; then
        cp -r fonts "$DEPLOY_DIR/"
    fi

    # PHP files
    cp send-email.php "$DEPLOY_DIR/"
    cp config.env.php "$DEPLOY_DIR/"

    # Cache files (optional)
    if [ -f "cache.php" ]; then
        cp cache.php "$DEPLOY_DIR/"
    fi
    if [ -f "cache-example.php" ]; then
        cp cache-example.php "$DEPLOY_DIR/"
    fi

    # .htaccess
    cp .htaccess "$DEPLOY_DIR/"

    # Favicon (if exists)
    if [ -f "favicon.ico" ]; then
        cp favicon.ico "$DEPLOY_DIR/"
    fi

    print_success "Files copied to $DEPLOY_DIR/"
}

###############################################################################
# Verify Deployment Package
###############################################################################

verify_files() {
    print_step "Verifying deployment package..."

    ERRORS=0

    # Check critical files exist
    critical_files=(
        "index.html"
        "css/styles.min.css"
        "js/main.min.js"
        "js/gsap-animations.min.js"
        "js/form.min.js"
        "send-email.php"
        "config.env.php"
        ".htaccess"
    )

    for file in "${critical_files[@]}"; do
        if [ ! -f "$DEPLOY_DIR/$file" ]; then
            print_error "Missing critical file: $file"
            ERRORS=$((ERRORS + 1))
        fi
    done

    # Check directories exist
    critical_dirs=(
        "css"
        "js"
        "images"
        "fonts"
    )

    for dir in "${critical_dirs[@]}"; do
        if [ ! -d "$DEPLOY_DIR/$dir" ]; then
            print_warning "Missing directory: $dir"
        fi
    done

    if [ $ERRORS -eq 0 ]; then
        print_success "All critical files present"
    else
        print_error "Verification failed with $ERRORS errors"
        exit 1
    fi
}

###############################################################################
# Create Archive
###############################################################################

create_archive() {
    print_step "Creating deployment archive..."

    # Check if zip is available
    if ! command -v zip &> /dev/null; then
        print_warning "zip command not found. Skipping archive creation."
        print_warning "You can manually zip the $DEPLOY_DIR folder."
        return
    fi

    # Create archive
    cd "$DEPLOY_DIR"
    zip -r "../$ARCHIVE_NAME" . > /dev/null 2>&1
    cd ..

    if [ -f "$ARCHIVE_NAME" ]; then
        ARCHIVE_SIZE=$(du -h "$ARCHIVE_NAME" | cut -f1)
        print_success "Archive created: $ARCHIVE_NAME ($ARCHIVE_SIZE)"
    else
        print_error "Failed to create archive"
    fi
}

###############################################################################
# Display Summary
###############################################################################

show_summary() {
    echo ""
    echo -e "${BLUE}${BOLD}═══════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}${BOLD}  Deployment Package Ready!${NC}"
    echo -e "${BLUE}${BOLD}═══════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "${BOLD}Deployment folder:${NC} $DEPLOY_DIR/"

    if [ -f "$ARCHIVE_NAME" ]; then
        echo -e "${BOLD}Archive file:${NC} $ARCHIVE_NAME"
    fi

    echo ""
    echo -e "${YELLOW}${BOLD}Next Steps:${NC}"
    echo -e "  1. Review files in ${BOLD}$DEPLOY_DIR/${NC}"
    echo -e "  2. Connect to your server via FTP/SFTP"
    echo -e "  3. Upload all files to your web root (e.g., public_html/)"
    echo -e "  4. Set file permissions (folders: 755, files: 644)"
    echo -e "  5. Test your website"
    echo ""
    echo -e "${YELLOW}${BOLD}Files in deployment package:${NC}"

    # Count files
    FILE_COUNT=$(find "$DEPLOY_DIR" -type f | wc -l)
    TOTAL_SIZE=$(du -sh "$DEPLOY_DIR" | cut -f1)

    echo -e "  Total files: ${BOLD}$FILE_COUNT${NC}"
    echo -e "  Total size: ${BOLD}$TOTAL_SIZE${NC}"
    echo ""

    # List structure
    echo -e "${YELLOW}${BOLD}Directory structure:${NC}"
    if command -v tree &> /dev/null; then
        tree -L 2 "$DEPLOY_DIR" -I 'node_modules'
    else
        ls -la "$DEPLOY_DIR"
    fi

    echo ""
    echo -e "${BLUE}${BOLD}═══════════════════════════════════════════════════════${NC}"
    echo ""
}

###############################################################################
# Deployment via SFTP (Optional)
###############################################################################

deploy_sftp() {
    if [ "$1" != "--upload" ]; then
        return
    fi

    print_step "Deploying via SFTP..."

    # Prompt for credentials
    read -p "SFTP Host: " SFTP_HOST
    read -p "SFTP Username: " SFTP_USER
    read -p "Remote path (e.g., /public_html/): " REMOTE_PATH

    print_step "Uploading files to $SFTP_HOST..."

    # Use sftp batch mode
    sftp "$SFTP_USER@$SFTP_HOST" <<EOF
cd $REMOTE_PATH
put -r $DEPLOY_DIR/*
bye
EOF

    if [ $? -eq 0 ]; then
        print_success "Files uploaded successfully!"
    else
        print_error "Upload failed. Please check credentials and try again."
        print_warning "You can manually upload the files from $DEPLOY_DIR/"
    fi
}

###############################################################################
# Main Script
###############################################################################

main() {
    print_header

    # Check requirements
    check_requirements

    # Run build
    run_build

    # Prepare files
    prepare_files

    # Verify package
    verify_files

    # Create archive
    create_archive

    # Show summary
    show_summary

    # Deploy if --upload flag passed
    deploy_sftp "$1"
}

# Run main function
main "$@"
