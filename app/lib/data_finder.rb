module DataFinder
  def self.base_path
    File.join(SigmaDisplay.root, 'app/public/data')
  end

  def self.get_dir_content(*dir)
    dir = File.join(self.base_path, *dir)
    return [] unless File.directory?(dir)
    files = Dir[File.join(dir, '*')]
    files.map { |f| File.basename(f) }.sort_by { |f| f.downcase }
  end
end
