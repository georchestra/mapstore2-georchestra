import os
from mkdocs.structure.files import File


def on_files(files, config, **kwargs):
    src_path = "versions.json"
    original_docs = "docs"
    abs_src = os.path.join(original_docs, src_path)

    if os.path.exists(abs_src) and not any(f.src_path == src_path for f in files):
        files.append(File(src_path, original_docs, config["site_dir"], False))

    return files
