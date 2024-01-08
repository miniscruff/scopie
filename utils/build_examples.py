import yaml
import material.extensions.emoji
import pymdownx.superfences
import requests

output_dir = "docs/examples"

# For preserving yaml indentation
class IndentDumper(yaml.Dumper):
    def increase_indent(self, flow=False, indentless=False):
        return super(IndentDumper, self).increase_indent(flow, False)

# Read current mkdocs file
with open("mkdocs.yml", "r") as first_file:
    try:
        data = yaml.load(first_file, Loader=yaml.FullLoader)
    except Exception as e:
        print(e)

# Build a new example.md for each language
for idx, nav in enumerate(data['nav']):
    if nav.get('Examples'):
        try:
            for l_idx, val in enumerate(data['extra']['repo_examples']):
                lang = list(data['extra']['repo_examples'][l_idx].keys())[0]
                url = data['extra']['repo_examples'][l_idx][lang]
                if f'examples/{lang}.md' in data['nav'][idx]['Examples']:
                    pass
                else:
                    data['nav'][idx]['Examples'].append(f'examples/{lang}.md')
                    # Get the raw code from github
                    response = requests.get(url)

                    # Raise an exception for HTTP errors (4xx or 5xx)
                    response.raise_for_status()  
                    
                # Write each line of the code, indented in a named code fence
                content = response.text.split('\n')
                with open(f"{output_dir}/{lang}.md", "w", encoding="utf-8") as output_file:
                        output_file.write(f"```{val}\n")
                        for line in content:
                            output_file.write("\t" + line + "\n")
                        output_file.write(f"```")

            # Update the mkdocs yml
            with open("mkdocs2.yml", "w") as second_file:
                yaml.dump(data,  second_file, Dumper=IndentDumper, default_flow_style=False, sort_keys=False)

        except requests.exceptions.RequestException as e:
            print(f"Error: {e}")

