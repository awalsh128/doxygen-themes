cmake_minimum_required(VERSION 3.16.3)
# set(CMAKE_VERBOSE_MAKEFILE ON)  # Debug in verbose mode.

include(GNUInstallDirs) # Make CMAKE_INSTALL_*DIR variables available.
set(CMAKE_CXX_STANDARD 20)

project(doxygen-themes
  VERSION 0.1
  DESCRIPTION 
    "Test project for experimenting with different Doxygen themes..")  

#
# NOTE: We use add_custom_target because building everytime is cheap and involves
#       less configuration / verbosity.
#

message(STATUS "Building example library.")

file(GLOB SRC_FILES example_src/*.h example_src/*.cpp)

add_library(example_src STATIC ${SRC_FILES})
set_target_properties(example_src PROPERTIES VERSION ${PROJECT_VERSION})

find_package(Doxygen)
if (NOT DOXYGEN_FOUND)
  message(SEND_ERROR "Doxygen not found. This must be installed for the project to work.")
  return()
endif(NOT DOXYGEN_FOUND)

# Setup Doxygen variables for executable.
set(DOXYFILE_IN_FILE ${CMAKE_CURRENT_SOURCE_DIR}/shared/Doxyfile.in)

# Clean directory.
file(REMOVE RECURSE ${PROJECT_BINARY_DIR})

# Copy landing page to themes.
add_custom_target(landing ALL
  COMMENT "Building theme landing page."
  COMMAND ${CMAKE_COMMAND} -E copy ${PROJECT_SOURCE_DIR}/themes/index.html ${PROJECT_BINARY_DIR}/themes
  COMMAND ${CMAKE_COMMAND} -E copy ${PROJECT_SOURCE_DIR}/themes/style.css ${PROJECT_BINARY_DIR}/themes)

function(BUILD_THEME FRIENDLY_NAME FOLDER)
  set(THEME_INPUT_DIR ${PROJECT_SOURCE_DIR}/themes/${FOLDER})
  set(THEME_OUTPUT_DIR ${PROJECT_BINARY_DIR}/themes/${FOLDER})
  file(MAKE_DIRECTORY ${THEME_OUTPUT_DIR})

  set(DOXYFILE_OUT_FILE ${THEME_INPUT_DIR}/Doxyfile)

  # Doxyfile.in variable substitutions.
  set(THEME_SRC_INPUT ${PROJECT_SOURCE_DIR}/example_src)
  set(THEME_FOOTER_FILE ${THEME_INPUT_DIR}/footer.html)
  set(THEME_HEADER_FILE ${THEME_INPUT_DIR}/header.html)
  set(THEME_CSS_FILE ${THEME_INPUT_DIR}/doxygen.css)
  set(THEME_EXTRA_FILES "${PROJECT_SOURCE_DIR}/shared/logo.png ${PROJECT_SOURCE_DIR}/shared/logo_name.png ${PROJECT_SOURCE_DIR}/shared/style.css")

  # Replace variables inside @var@ with the current values
  configure_file(${DOXYFILE_IN_FILE} ${DOXYFILE_OUT_FILE} @ONLY)

  add_custom_target(${FOLDER} ALL
    COMMENT "Building ${FRIENDLY_NAME} theme."
    # Run Doxygen and generate docs.
    COMMAND ${DOXYGEN_EXECUTABLE} ${DOXYFILE_OUT_FILE})

  # Require source code compile to generate documentation from.
  add_dependencies(${FOLDER} example_src)

endfunction()

build_theme("Primary Dark" primary_dark)
build_theme("Primary Light" primary_light)
build_theme("Custom Palette" custom_palette)

# Copy custom palette stylesheets.
set(PALETTE_INPUT_DIR ${PROJECT_SOURCE_DIR}/themes/custom_palette)
set(PALETTE_OUTPUT_DIR ${PROJECT_BINARY_DIR}/themes/custom_palette)
add_custom_target(palettes ALL
  COMMENT "Building custom palettes."
  COMMAND ${CMAKE_COMMAND} -E copy ${PALETTE_INPUT_DIR}/palette.js ${PALETTE_OUTPUT_DIR}
  COMMAND ${CMAKE_COMMAND} -E copy ${PALETTE_INPUT_DIR}/palette_google.css ${PALETTE_OUTPUT_DIR}
  COMMAND ${CMAKE_COMMAND} -E copy ${PALETTE_INPUT_DIR}/palette_neonpink.css ${PALETTE_OUTPUT_DIR}
  COMMAND ${CMAKE_COMMAND} -E copy ${PALETTE_INPUT_DIR}/palette_twitter.css ${PALETTE_OUTPUT_DIR})

message(STATUS "Themes built in ${PROJECT_BINARY_DIR}/themes")