{ pkgs, lib, config, inputs, ... }:

{
  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_22;
    directory = "./frontend";
    npm = {
      enable = true;
      install.enable = true;
    };
  };

  # See full reference at https://devenv.sh/reference/options/
}
