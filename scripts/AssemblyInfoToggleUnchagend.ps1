function Get-SrcPath {
    $currentSrc = Join-Path $PSScriptRoot "src"
    if (Test-Path $currentSrc -PathType Container) {
        return $currentSrc
    }

    $parentSrc = Join-Path $PSScriptRoot "..\src"
    if (Test-Path $parentSrc -PathType Container) {
        return (Resolve-Path $parentSrc).Path
    }

    Write-Host "ERROR: 'src' folder not found." -ForegroundColor Red
    exit 1
}

$srcPath = Get-SrcPath
Write-Host "Using src folder: $srcPath"

# Description: PowerShell script to mark files as --assume-unchanged or --no-assume-unchanged

# Set the Git argument
# --assume-unchanged: For ignoring changes in the file
$gitArgument = "--assume-unchanged"

# Uncomment the following line to track changes again
#$gitArgument = "--no-assume-unchanged"

# Define the list of files
 

# Get all AssemblyInfo.cs files
$filesAssemblyInfo = Get-ChildItem -Path $srcPath -Recurse -Filter "AssemblyInfo.cs"

Write-Output "Found $($filesAssemblyInfo.Count) files."

# Get all tsconfig.json files
$filesTsConfig = Get-ChildItem -Path $srcPath -Recurse -Filter 'tsconfig.json'


#Get all Html.Referencias.ts files

$filesHtmlReferencias = Get-ChildItem -Path $srcPath -Recurse -Filter 'Html.Referencias.ts'

# Combine both collections into a single array
$allFiles = $filesAssemblyInfo + $filesTsConfig + $filesHtmlReferencias

#Write count
Write-Output "Found $($allFiles.Count) files."


# Loop through each file and apply the Git argument
foreach ($file in $allFiles) {

    if (Test-Path $file) {
        git update-index $gitArgument $file
        Write-Output "Marked $file as $gitArgument."
    } else {
        Write-Output "Skipped ${file}: File does not exist."
    }
}
